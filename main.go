package main

import (
	"encoding/json"
	"flag"
	"log"
	"net/http"
	"strconv"

	"github.com/Sirupsen/logrus"
	"github.com/codegangsta/negroni"
	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	//	"github.com/samalba/dockerclient"
)

var (
	addr   = flag.String("p", ":9000", "Address and port to serve dockerui")
	assets = flag.String("a", "dist", "Path to the assets")
	dbmap  = initDb()
	logger = logrus.New()
)

/*
type UnixHandler struct {
	path string
}

func (h *UnixHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	conn, err := net.Dial("unix", h.path)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println(err)
		return
	}
	c := httputil.NewClientConn(conn, nil)
	defer c.Close()

	res, err := c.Do(r)
	if err != nil {
		w.WriteHeader(http.StatusInternalServerError)
		log.Println(err)
		return
	}
	defer res.Body.Close()

	copyHeader(w.Header(), res.Header)
	if _, err := io.Copy(w, res.Body); err != nil {
		log.Println(err)
	}
}

func copyHeader(dst, src http.Header) {
	for k, vv := range src {
		for _, v := range vv {
			dst.Add(k, v)
		}
	}
}

func createTcpHandler(e string) http.Handler {
	u, err := url.Parse(e)
	if err != nil {
		log.Fatal(err)
	}
	return httputil.NewSingleHostReverseProxy(u)
}

func createUnixHandler(e string) http.Handler {
	return &UnixHandler{e}
}

func createHandler(dir string, e string) http.Handler {
	var (
		globalMux   = http.NewServeMux()
		fileHandler = http.FileServer(http.Dir(dir))
		h           http.Handler
	)

	if strings.Contains(e, "http") {
		h = createTcpHandler(e)
	} else {
		if _, err := os.Stat(e); err != nil {
			if os.IsNotExist(err) {
				log.Fatalf("unix socket %s does not exist", e)
			}
			log.Fatal(err)
		}
		h = createUnixHandler(e)
	}

	globalMux.Handle("/dockerapi/", http.StripPrefix("/dockerapi", h))
	globalMux.Handle("/", fileHandler)
	return globalMux
}
*/
func listImages(w http.ResponseWriter, r *http.Request) {
	images := QueryImage()
	if err := json.NewEncoder(w).Encode(images); err != nil {
		logger.Error(err)
	}
}

func listMyImages(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	uid, _ := strconv.ParseInt(vars["id"], 10, 64)
	var i CRImage
	image := i.QuerybyUser(uid)
	if err := json.NewEncoder(w).Encode(image); err != nil {
		logger.Error(err)
	}
}

type imageFullName struct {
	fullname string
}

func getImageName(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.ParseInt(vars["id"], 10, 64)
	var img CRImage
	image := img.Querylog(id)
	name := image.ImageName + ":" + strconv.Itoa(image.Tag)
	fullName := imageFullName{fullname: name}
	if err := json.NewEncoder(w).Encode(fullName); err != nil {
		logger.Error(err)
	}
}

func imageLogs(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.ParseInt(vars["id"], 10, 64)
	var img CRImage
	image := img.Querylog(id)
	if err := json.NewEncoder(w).Encode(*image); err != nil {
		logger.Error(err)
	}
}

type unique struct {
	IsUnique bool
}

func imageVerify(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	name := vars["name"]
	isUnique := QueryVerify(name)
	if err := json.NewEncoder(w).Encode(unique{IsUnique: isUnique}); err != nil {
		logger.Error(err)
	}
}

func deleteImage(w http.ResponseWriter, r *http.Request) {
	//	vars := mux.Vars(r)
	//	id, _ := strconv.ParseInt(vars["id"], 10, 64)
}

type newimage struct {
	UserId    int64
	ImageName string
	BaseImage string
	Tag       int
	Descrip   string
}

type baseImage struct {
	Bimage string
}

func createImage(w http.ResponseWriter, r *http.Request) {
	//	vars := mux.Vars(r)
	//	id, _ := strconv.ParseInt(vars["id"], 10, 64)
	var ni newimage
	if err := json.NewDecoder(r.Body).Decode(&ni); err != nil {
		logger.Warnf("error decoding image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	bi := baseImage{ni.BaseImage}
	cr := newImage(ni.UserId, ni.ImageName, ni.Tag, ni.Descrip)
	if err := cr.Add(); err != nil {
		logger.Warnf("error creating image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	if err := json.NewEncoder(w).Encode(bi); err != nil {
		logger.Error(err)
	}
}

type myImageID struct {
	ID int64
}

func commitImage(w http.ResponseWriter, r *http.Request) {
	//	var ni newimage
	var ci CRImage
	if err := json.NewDecoder(r.Body).Decode(&ci); err != nil {
		logger.Warnf("error decoding image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := ci.dockerCommit(); err != nil {
		logger.Warnf("error decoding image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
	//response the image id
	//	mi := myImageID{ID: ci.ImageId}
	//	if err := json.NewEncoder(w).Encode(mi); err != nil {
	//		logger.Error(err)
	//	}
}

func editImage(w http.ResponseWriter, r *http.Request) {
	//	vars := mux.Vars(r)
	//	id, _ := strconv.ParseInt(vars["id"], 10, 64)
	var ci CRImage
	if err := json.NewDecoder(r.Body).Decode(&ci); err != nil {
		logger.Warnf("error decoding image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := ci.UpdateImage(); err != nil {
		logger.Warnf("error updating image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("content-type", "application/json")
	w.WriteHeader(http.StatusCreated)
}

func pushImage(w http.ResponseWriter, r *http.Request) {
	var ci CRImage
	if err := json.NewDecoder(r.Body).Decode(&ci); err != nil {
		logger.Warnf("error decoding image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if err := ci.dockerPush(); err != nil {
		logger.Warnf("error pushing image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func starImage(w http.ResponseWriter, r *http.Request) {
	//	r.ParseForm()
	//	starStr := r.FormValue("sbool")
	//	star, _ := strconv.ParseBool(starStr)
	//	sid := r.FormValue("id")
	//	log.Println(sid)
	//	log.Println(star)
	var cr CRImage
	//	var cs CRStar
	if err := json.NewDecoder(r.Body).Decode(&cr); err != nil {
		logger.Warnf("error decoding image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	//	var cs CRStar
	//	if star {
	//		cs = CRStar{ImageId: cr.ImageId, UserId: cr.UserId}
	//		//		sid, _ := strconv.ParseInt(r.FormValue("id"), 10, 64)
	//		//		cs = CRStar{StarId: sid, ImageId: cr.ImageId, UserId: cr.UserId}
	//	} else {
	//		sid, _ := strconv.ParseInt(r.FormValue("id"), 10, 64)
	//		cs = CRStar{StarId: sid, ImageId: cr.ImageId, UserId: cr.UserId}
	//	}
	//	log.Println(cr)
	err := cr.UpdateStar()
	if err != nil {
		logger.Warnf("error staring image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	//	log.Println(cs)
	//	cs := CRStar{id, uid}
	//	UpdateStar(cs, true)
}

type starID struct {
	ID int64
}

func queryStarid(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.ParseInt(vars["id"], 10, 64)
	uid, _ := strconv.ParseInt(vars["uid"], 10, 64)
	cs := CRStar{ImageId: id, UserId: uid}
	sid := cs.QueryStar()
	if err := json.NewEncoder(w).Encode(starID{ID: sid}); err != nil {
		logger.Error(err)
	}
}

//func unstarImage(w http.ResponseWriter, r *http.Request) {

//}

func forkImage(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	id := r.FormValue("uid")
	uid, _ := strconv.ParseInt(vars["uid"], 10, 64)
}

//func fortest(w http.ResponseWriter, r *http.Request) {
//	if err := json.NewEncoder(w).Encode(starID{ID: 2}); err != nil {
//		logger.Error(err)
//	}
//}

func main() {
	flag.Parse()

	/*	db, err := sql.Open("mysql", "root:root@/coderun_image")
		if err != nil {
			panic(err.Error()) // Just for example purpose. You should use proper error handling instead of panic
		}
		defer db.Close()

		// Prepare statement for reading data
		stmtOut, err := db.Prepare("SELECT image_name FROM cr_image WHERE image_id = ?")
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		defer stmtOut.Close()

		var imageName string // we "scan" the result in here

		// Query the square-number of 13
		err = stmtOut.QueryRow(1).Scan(&imageName) // WHERE number = 13
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		fmt.Printf("The image name is: %s", imageName)
	*/

	defer dbmap.Db.Close()
	/*
		docker, _ := dockerclient.NewDockerClient("unix:///var/run/docker.sock", nil)

		// Get only running containers
		containers, err := docker.ListContainers(false, false, "")
		if err != nil {
			log.Fatal(err)
		}
		for _, c := range containers {
			log.Println(c.Id, c.Names)
		}
	*/
	globalMux := http.NewServeMux()
	apiRouter := mux.NewRouter()
	apiRouter.HandleFunc("/dockerapi/image/{id}/name", getImageName).Methods("GET")
	apiRouter.HandleFunc("/dockerapi/images", listImages).Methods("GET")
	apiRouter.HandleFunc("/dockerapi/images/{id}/list", listMyImages).Methods("GET")
	apiRouter.HandleFunc("/dockerapi/images/{id}/log", imageLogs).Methods("GET")
	apiRouter.HandleFunc("/dockerapi/images/{name}/verify", imageVerify).Methods("GET")
	apiRouter.HandleFunc("/dockerapi/images/{id}/delete", deleteImage).Methods("DELETE")
	apiRouter.HandleFunc("/dockerapi/image/create", createImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/image/commit", commitImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/image/push", pushImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/image/edit", editImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/image/star", starImage).Methods("POST")
	//	apiRouter.HandleFunc("/dockerapi/image/unstar", unstarImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/image/fork", forkImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/star/{uid}/{id}", queryStarid).Methods("GET")
	//	apiRouter.HandleFunc("/dockerapi/test", fortest).Methods("GET")
	//	apiRouter.HandleFunc("/dockerapi/image/comment/{id}", getComment).Methods("GET")
	//	apiRouter.HandleFunc("/dockerapi/image/star/{id}/{uid}", getStarLog).Methods("GET")
	//	apiRouter.HandleFunc("/dockerapi/image/fork/{id}/{uid}", getForkLog).Methods("GET")

	apiAuthRouter := negroni.Classic()
	apiAuthRouter.UseHandler(apiRouter)
	globalMux.Handle("/dockerapi/", apiAuthRouter)

	//	globalMux.Handle("/dockerapi/", http.StripPrefix("/dockerapi", h))
	globalMux.Handle("/", http.FileServer(http.Dir("dist")))

	//	handler := createHandler(*assets, *endpoint)
	if err := http.ListenAndServe(*addr, globalMux); err != nil {
		log.Fatal(err)
	}
}
