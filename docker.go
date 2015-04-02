package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"

	"github.com/fsouza/go-dockerclient"
)

var (
	endpoint  = "unix:///var/run/docker.sock"
	client, _ = docker.NewClient(endpoint)
)

type DockerImageID struct {
	ID string
}

func (c CRImage) dockerCommit() error {
	//func main() {
	//req, err := http.NewRequest("GET", c.getURL(path), params)
	resp, err := http.Get("http://localhost:8080/containers/" + c.UserId)
	if err != nil {
		fmt.Println(err)
		return err
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println(err)
		return err
	}
	var di DockerImageID
	err = json.Unmarshal(body, &di)

	err = client.StopContainer(di.ID, 5)

	commitOpts := docker.CommitContainerOptions{Container: di.ID, Repository: c.ImageName, Tag: strconv.Itoa(c.Tag)}
	if _, err := client.CommitContainer(commitOpts); err != nil {
		fmt.Println(err)
		return err
	}
	if err = client.RemoveContainer(docker.RemoveContainerOptions{ID: di.ID}); err != nil {
		fmt.Println(err)
		return err
	}
	return nil
	//	err = client.RemoveContainer(docker.RemoveContainerOptions{ID: "ffc4dfc4827c"})
}

//func dockerDelete(id string) {
//	if err := client.CommitContainer(commitOpts); err != nil {
//		fmt.Println(err)
//		return err
//	}
//}
