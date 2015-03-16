package main

import (
	"database/sql"
	"gopkg.in/gorp.v1"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

type CRImage struct {
	// db tag lets you specify the column name if it differs from the struct field.
	// remember to keep the first letter of the fields in the struct uppercase
	// because All the fields in a struct are exported or hidden simply based on the first letter
	// if it is uppercase, the field is exported. Otherwise, it is not, then the sql operation will return error.
	ImageId     int64  `db:"Image_id"`
	UserId      int64  `db:"User_id"`
	ImageName   string `db:"Image_name"`
	ImageRealid string `db:"Image_realid"`
	Star        int32  `db:"Star"`
	Fork        int32  `db:"Fork"`
	Descrip     string `db:"Description"`
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
	Add()
	QuerybyUser(uid int64) []CRImage
	Querylog(imageid int64)
	DeleteImg()
	UpdateStar(cs CRStar, star bool)
	UpdateFork(cf CRFork)
}

//return a new CRImage struct by the input data
func newImage(uid int64, imgname string, rid string, des string) CRImage {
	return CRImage{
		UserId:      uid,
		ImageName:   imgname,
		ImageRealid: rid,
		Star:        0,
		Fork:        0,
		Descrip:     des,
	}
}

//insert a new record into cr_image table
func (c CRImage) Add() {
	err := dbmap.Insert(&c)
	checkErr(err, "Insert failed")
	return
}

//Query the image list by userid, return an array of CRImage struct
func (c CRImage) QuerybyUser(uid int64) []CRImage {
	var image []CRImage
	_, err := dbmap.Select(&image, "select * from cr_image where User_id = ?", uid)
	checkErr(err, "Select failed")
	return image
}

//Query the log of an image by its id
func (c *CRImage) Querylog(imageid int64) *CRImage {
	obj, err := dbmap.Get(CRImage{}, imageid)
	if err != nil {
		log.Fatalln("Select failed", err)
	}
	c = obj.(*CRImage)
	return obj.(*CRImage)
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

//update the star list of an image, if star is true, insert a new star record, else delete the original record
func (c CRImage) UpdateStar(cs CRStar, star bool) {
	_, err := dbmap.Update(&c)
	checkErr(err, "Update failed")
	if star {
		err = dbmap.Insert(&cs)
		checkErr(err, "Insert failed")
	} else {
		_, err = dbmap.Delete(&cs)
		checkErr(err, "Delete failed")
	}
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
