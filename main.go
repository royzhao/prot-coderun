package main // import "github.com/crosbymichael/dockerui"

import (
	//	"database/sql"
	"flag"
	//	"fmt"
	"log"
	"net/http"

	"github.com/codegangsta/negroni"
	//	_ "github.com/go-sql-driver/mysql"
	"github.com/gorilla/mux"
	"github.com/samalba/dockerclient"
)

var (
	endpoint = flag.String("e", "/var/run/docker.sock", "Dockerd endpoint")
	addr     = flag.String("p", ":9000", "Address and port to serve dockerui")
	assets   = flag.String("a", "dist", "Path to the assets")
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

}
func listMyImages(w http.ResponseWriter, r *http.Request) {

}
func imageLogs(w http.ResponseWriter, r *http.Request) {

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
	docker, _ := dockerclient.NewDockerClient("unix:///var/run/docker.sock", nil)

	// Get only running containers
	containers, err := docker.ListContainers(false, false, "")
	if err != nil {
		log.Fatal(err)
	}
	for _, c := range containers {
		log.Println(c.Id, c.Names)
	}

	globalMux := http.NewServeMux()
	apiRouter := mux.NewRouter()
	apiRouter.HandleFunc("/dockerapi/images/list", listImages).Methods("GET")
	apiRouter.HandleFunc("/dockerapi/images/list/{uid}", listMyImages).Methods("GET")
	apiRouter.HandleFunc("/dockerapi/images/{id}/logs", imageLogs).Methods("GET")

	apiAuthRouter := negroni.Classic()
	apiAuthRouter.UseHandler(apiRouter)
	globalMux.Handle("/dockerapi", apiAuthRouter)

	//	globalMux.Handle("/dockerapi/", http.StripPrefix("/dockerapi", h))
	globalMux.Handle("/", http.FileServer(http.Dir("dist")))

	//	handler := createHandler(*assets, *endpoint)
	if err := http.ListenAndServe(*addr, globalMux); err != nil {
		log.Fatal(err)
	}
}
