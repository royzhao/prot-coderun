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
	//req, err := http.NewRequest("GET", c.getURL(path), params)
	err1 := client.StopContainer("0383b55de49b", 5)

	commitOpts := docker.CommitContainerOptions{Container: "0383b55de49b", Repository: "hahaha", Tag: strconv.Itoa(1)}
	if img, err := client.CommitContainer(commitOpts); err != nil {
		fmt.Println(err)
		return
	}
	if err = client.RemoveContainer(docker.RemoveContainerOptions{ID: "0383b55de49b"}); err != nil {
		return
	}

	//	err = client.RemoveContainer(docker.RemoveContainerOptions{ID: "ffc4dfc4827c"})
}

func deleteImageAPI(id string) {

}
