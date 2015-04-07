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

func imageLogs(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, _ := strconv.ParseInt(vars["id"], 10, 64)
	var img CRImage
	image := img.Querylog(id)
	if err := json.NewEncoder(w).Encode(*image); err != nil {
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
	if err := json.NewEncoder(w).Encode({ID:ci.ImageId}); err != nil {
		logger.Error(err)
	}
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

func starImage(w http.ResponseWriter, r *http.Request) {
	r.ParseForm()
	p := r.FormValue("id")
	c := r.FormValue("uid")
	log.Println(p)
	log.Println(c)
	//	var image CRImage
	var cs CRStar
	if err := json.NewDecoder(r.Body).Decode(&cs); err != nil {
		logger.Warnf("error decoding image: %s", err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	//	UpdateStar(cs, true)
	//	log.Println(cs)
	//	cs := CRStar{id, uid}
	//	UpdateStar(cs, true)
}

func unstarImage(w http.ResponseWriter, r *http.Request) {

}

func forkImage(w http.ResponseWriter, r *http.Request) {

}

func main() {
	flag.Parse()

	/*	var (
			globalMux = http.NewServeMux()
			h         http.Handler
		)

		if strings.Contains(*endpoint, "http") {
			h = createTcpHandler(*endpoint)
		} else {
			if _, err := os.Stat(*endpoint); err != nil {
				if os.IsNotExist(err) {
					log.Fatalf("unix socket %s does not exist", *endpoint)
				}
				log.Fatal(err)
			}
			h = createUnixHandler(*endpoint)
		}*/

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
	//	cf := &CRFork{'1', '1', '1'}
	//	c := CRImage{3, 0, "", "", 0, 0, ""}
	//	err := dbmap.SelectOne(cf, "select fork_id from cr_fork where user_id = ? and image_id = ?", c.UserId, c.ImageId)
	//	log.Println(*cf)
	//	log.Println(err)

	//	image := CRImage{3, 0, "", "", 0, 0, ""}
	//	image.DeleteImg()

	//	c := newImage(2, "golang", "422", "test")
	//	c.Add()

	//	var image CRImage
	//	im := image.Querylog(1)

	//	log.Println(*im)

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
	apiRouter.HandleFunc("/dockerapi/images", listImages).Methods("GET")
	apiRouter.HandleFunc("/dockerapi/images/{id}/list", listMyImages).Methods("GET")
	apiRouter.HandleFunc("/dockerapi/images/{id}/log", imageLogs).Methods("GET")
	apiRouter.HandleFunc("/dockerapi/images/{id}/delete", deleteImage).Methods("DELETE")
	apiRouter.HandleFunc("/dockerapi/image/create", createImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/image/commit", commitImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/image/edit", editImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/image/star", starImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/image/unstar", unstarImage).Methods("POST")
	apiRouter.HandleFunc("/dockerapi/image/fork", forkImage).Methods("POST")
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
