package main

import (
	"fmt"
	"github.com/fsouza/go-dockerclient"
	"strconv"
)

var (
	endpoint  = "unix:///var/run/docker.sock"
	client, _ = docker.NewClient(endpoint)
)

func (c CRImage) dockerCommit() {
	//func main() {
	//req, err := http.NewRequest(method, c.getURL(path), params)
	img, err := client.CommitContainer(docker.CommitContainerOptions{Container: "0383b55de49b", Repository: "hahaha", Tag: strconv.Itoa(1)})
	fmt.Println(img)
	if err != nil {
		fmt.Println(err)
		return
	}
	//	err = client.RemoveContainer(docker.RemoveContainerOptions{ID: "ffc4dfc4827c"})
}

func deleteImageAPI(id string) {

}
