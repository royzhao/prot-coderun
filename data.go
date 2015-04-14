package main

import (
	"database/sql"
	"gopkg.in/gorp.v1"
	"log"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

type CRImage struct {
	// db tag lets you specify the column name if it differs from the struct field.
	// remember to keep the first letter of the fields in the struct uppercase
	// because All the fields in a struct are exported or hidden simply based on the first letter
	// if it is uppercase, the field is exported. Otherwise, it is not, then the sql operation will return error.
	ImageId   int64  `db:"Image_id"`
	UserId    int64  `db:"User_id"`
	ImageName string `db:"Image_name"`
	Tag       int    `db:"Tag"`
	Star      int    `db:"Star"`
	Fork      int    `db:"Fork"`
	Comm      int    `db:"Comment"`
	Status    int8   `db:"Status`
	Descrip   string `db:"Description"`
	Date      string `db:"Date"`
}

type CRComments struct {
	CommentId int64  `db:"comment_id"`
	ImageID   int64  `db:"image_id"`
	Author    string `db:"author"`
	Reply     string `db:"replyto"`
	Content   string `db:"content"`
}

type CRStar struct {
	StarId  int64 `db:"star_id"`
	ImageId int64 `db:"image_id"`
	UserId  int64 `db:"user_id"`
}

type CRFork struct {
	ForkId  int64 `db:"fork_id"`
	ImageId int64 `db:"image_id"`
	UserId  int64 `db:"user_id"`
}

type SqlOperation interface {
	Add() error
	QuerybyUser(uid int64) []CRImage
	QueryVerify(name string) bool
	Querylog(imageid int64)
	DeleteImg()
	UpdateImage() error
	UpdateStar(cs CRStar, star bool)
	UpdateFork(cf CRFork)
}

//return a new CRImage struct by the input data
func newImage(uid int64, imgname string, tag int, des string) CRImage {
	return CRImage{
		UserId:    uid,
		ImageName: imgname,
		Tag:       tag,
		Star:      0,
		Fork:      0,
		Comm:      0,
		Status:    0,
		Descrip:   des,
		Date:      time.Now().Format("2006-01-02"),
	}
}

//insert a new record into cr_image table
func (c CRImage) Add() error {
	err := dbmap.Insert(&c)
	return err
}

//Query the image list by userid, return an array of CRImage struct
func (c CRImage) QuerybyUser(uid int64) []CRImage {
	var image []CRImage
	_, err := dbmap.Select(&image, "select * from cr_image where User_id = ?", uid)
	checkErr(err, "Select list failed")
	return image
}

//Query the log of an image by its id
func (c *CRImage) Querylog(imageid int64) *CRImage {
	obj, err := dbmap.Get(CRImage{}, imageid)
	if err != nil {
		log.Fatalln("Select log failed", err)
	}
	c = obj.(*CRImage)
	return obj.(*CRImage)
}

//Verify whether the name of image is existed
func QueryVerify(name string) bool {
	count, err := dbmap.SelectInt("select count(1) from cr_image where Image_name = ?", name)
	if err != nil {
		log.Fatalln("Verify failed", err)
		return false
	}
	if count < 1 {
		return true
	}
	return false
}

//Delete an image by its id, if it is forked from another image, delete the fork record too
func (c CRImage) DeleteImg() {
	_, err := dbmap.Delete(&c)
	if err != nil {
		log.Println("Delete failed", err)
		return
	}
	cf := new(CRFork)
	err = dbmap.SelectOne(&cf, "select fork_id from cr_fork where user_id = ? and image_id = ?", c.UserId, c.ImageId)
	if err != nil {
		return
	}
	_, err = dbmap.Delete(&cf)
	if err != nil {
		log.Println("Delete failed", err)
		return
	}
}

//Update the details of an image
func (c CRImage) UpdateImage() error {
	_, err := dbmap.Update(&c)
	return err
}

//update the star list of an image, if star is true, insert a new star record, else delete the original record
func (c CRImage) UpdateStar() error {
	//	if _, err := dbmap.Update(&c); err != nil {
	//		log.Println("Update image log failed", err)
	//	}
	var cs CRStar
	star := true
	trans, _ := dbmap.Begin()
	count, err := trans.SelectInt("select count(1) from cr_star where user_id = ? and image_id = ?", c.UserId, c.ImageId)
	if err != nil {
		log.Println("1 failed", err)
		return err
	}
	if count > 0 {
		star = false
		err = trans.SelectOne(&cs, "select * from cr_star where user_id = ? and image_id = ?", c.UserId, c.ImageId)
		if err != nil {
			log.Println("2 failed", err)
			trans.Rollback()
			return err
		}
	}
	if star {
		//		err = dbmap.Insert(&cs)
		cs = CRStar{UserId: c.UserId, ImageId: c.ImageId}
		if err := trans.Insert(&cs); err != nil {
			log.Println("Star failed", err)
			trans.Rollback()
			return err
		}
		_, err := trans.Exec("update cr_image set Star = Star + 1 WHERE Image_id = ? ", c.ImageId)
		if err != nil {
			log.Println("Star failed", err)
			trans.Rollback()
			return err
		}
	} else {
		//		_, err = dbmap.Delete(&cs)
		if _, err := trans.Delete(&cs); err != nil {
			log.Println("Unstar failed", err)
			trans.Rollback()
			return err
		}
		_, err := trans.Exec("update cr_image set Star = Star - 1 WHERE Image_id = ? ", c.ImageId)
		if err != nil {
			log.Println("Unstar failed", err)
			trans.Rollback()
			return err
		}
	}
	trans.Commit()
	return nil
}

//insert a fork record of an image
func (c CRImage) UpdateFork(cf CRFork) {
	_, err := dbmap.Update(&c)
	if err != nil {
		log.Println("Update failed", err)
		return
	}
	err = dbmap.Insert(&cf)
	checkErr(err, "Insert failed")
}

func (c CRStar) QueryStar() int64 {
	var cs CRStar
	err := dbmap.SelectOne(&cs, "select star_id from cr_star where user_id = ? and image_id = ?", c.UserId, c.ImageId)
	//	count, err := dbmap.SelectInt("select count(1) from cr_star where user_id = ? and image_id = ?", cs.UserId, cs.ImageId)
	if err != nil {
		log.Println("Query starlog failed", err)
		return 0
	}
	return cs.StarId
}

func initDb() *gorp.DbMap {
	// connect to db using standard Go database/sql API
	// use whatever database/sql driver you wish
	db, err := sql.Open("mysql", "root:root@/coderun_image")
	checkErr(err, "sql.Open failed")

	// construct a gorp DbMap
	dbmap := &gorp.DbMap{Db: db, Dialect: gorp.MySQLDialect{"InnoDB", "UTF8"}}

	// add a table, setting the table name to 'posts' and
	// specifying that the Id property is an auto incrementing PK
	dbmap.AddTableWithName(CRImage{}, "cr_image").SetKeys(true, "ImageId")
	dbmap.AddTableWithName(CRComments{}, "cr_comment").SetKeys(true, "CommentId")
	dbmap.AddTableWithName(CRStar{}, "cr_star").SetKeys(true, "StarId")
	dbmap.AddTableWithName(CRFork{}, "cr_fork").SetKeys(true, "ForkId")

	// create the table. in a production system you'd generally
	// use a migration tool, or create the tables via scripts
	err = dbmap.CreateTablesIfNotExists()
	checkErr(err, "Create tables failed")

	return dbmap
}

func checkErr(err error, msg string) {
	if err != nil {
		log.Println(msg, err)
	}
}

func QueryImage() []CRImage {
	var image []CRImage
	_, err := dbmap.Select(&image, "select * from cr_image")
	checkErr(err, "Select failed")
	return image
}
