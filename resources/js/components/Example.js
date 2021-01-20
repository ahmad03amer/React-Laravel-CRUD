import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from 'reactstrap';
import axios from 'axios';

export default class Example extends Component {

    constructor() {
        super()
        this.state = {
            tasks: [],

            newTaskData: {
                title: "test",
                description: "test",
                due_date: "2020-10-10",
                category_id: "0"
            },
            editTaskData: {
                id: "",
                title: "",
                description: "",
                due_date: "",
                category_id: ""
            },
            editTaskModal: false,
            newTaskModal: false
        }
    }

    loadTask() {
        axios.get('http://127.0.0.1:8000/api/tasks').then((response) => {
            this.setState({
                tasks: response.data
            })
        })
    }

    addTask() {
        axios.post('http://127.0.0.1:8000/api/task', this.state.newTaskData).then((response) => {
            let { tasks } = this.state
            this.loadTask()

            this.setState({
                tasks,
                newTaskModal: false,
                newTaskData: {
                    id: "",
                    title: "",
                    description: "",
                    due_date: "",
                    category_id: ""
                }
            })
        })
    }

    componentWillMount() {
        this.loadTask();
    }

    toggelNewTaskModal() {
        this.setState({
            newTaskModal: !this.state.newTaskModal
        })
    }

    toggelEditTaskModal() {
        this.setState({
            editTaskModal: !this.state.editTaskModal
        })
    }

    updateTask() {
        let { title, description, category_id, due_date } = this.state.editTaskData
        axios.put('http://127.0.0.1:8000/api/task/' + this.state.editTaskData.id, {
            title,
            description,
            category_id,
            due_date
        }).then((response) => {
            this.loadTask()
            this.setState({
                editTaskModal: false,
                editTaskData: {
                    id: "",
                    title: "",
                    description: "",
                    due_date: "",
                    category_id: ""
                }
            })
        })
    }
    editTask(id, title, description, category_id, due_date) {
        console.log(id);
        this.setState({
            editTaskData: {
                id,
                title,
                description,
                category_id,
                due_date
            },
            editTaskModal: !this.state.editTaskModal
        })
    }

    deleteTask(id) {
        axios.delete('http://127.0.0.1:8000/api/task/' + id).then((response) => {
            this.loadTask()
        })
    }
    render() {

        let tasks = this.state.tasks.map((task) => {
            return (
                <tr key={task.id}>
                    <th >{task.id}</th>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.due_date}</td>
                    <td>
                        <Button color="success" size="sm" className="mr-2" onClick={this.editTask.bind(this, task.id, task.title, task.description, task.category_id, task.due_date)}>Edit</Button>
                        <Button
                            color="danger"
                            size="sm"
                            onClick={this.deleteTask.bind(this, task.id)}>Delete</Button>
                    </td>
                </tr>
            )
        })
        return (
            <div className="container">
                <h2>Tasks List</h2>
                <Button color="danger" onClick={this.toggelNewTaskModal.bind(this)} className="my-3">Add Task</Button>
                <Modal isOpen={this.state.newTaskModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                    toggle={this.toggelNewTaskModal.bind(this)}>
                    <ModalHeader toggle={this.toggelNewTaskModal.bind(this)}>Add Task</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Task Title</Label>
                            <Input
                                id="title"
                                value={this.state.newTaskData.title}
                                onChange={(e) => {
                                    let { newTaskData } = this.state
                                    newTaskData.title = e.target.value
                                    this.setState({ newTaskData })
                                }}></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="description">Task Description</Label>
                            <Input
                                id="description"
                                value={this.state.newTaskData.description}
                                onChange={(e) => {
                                    let { newTaskData } = this.state
                                    newTaskData.description = e.target.value
                                    this.setState({ newTaskData })
                                }}></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="category_id">Category Id</Label>
                            <Input
                                id="category_id"
                                value={this.state.newTaskData.category_id}
                                onChange={(e) => {
                                    let { newTaskData } = this.state
                                    newTaskData.category_id = e.target.value
                                    this.setState({ newTaskData })
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="due_date">Deadline</Label>
                            <Input
                                id="due_date"
                                value={this.state.newTaskData.due_date}
                                onChange={(e) => {
                                    let { newTaskData } = this.state
                                    newTaskData.due_date = e.target.value
                                    this.setState({ newTaskData })
                                }}></Input>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.addTask.bind(this)}>Add Task</Button>{' '}
                        <Button color="secondary" onClick={this.toggelNewTaskModal.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.editTaskModal} modalTransition={{ timeout: 700 }} backdropTransition={{ timeout: 1300 }}
                    toggle={this.toggelEditTaskModal.bind(this)}>
                    <ModalHeader toggle={this.toggelEditTaskModal.bind(this)}>Edit Task</ModalHeader>
                    <ModalBody>
                        <FormGroup>
                            <Label for="title">Task Title</Label>
                            <Input
                                id="title"
                                value={this.state.editTaskData.title}
                                onChange={(e) => {
                                    let { editTaskData } = this.state
                                    editTaskData.title = e.target.value
                                    this.setState({ editTaskData })
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Task Description</Label>
                            <Input
                                id="description"
                                value={this.state.editTaskData.description}
                                onChange={(e) => {
                                    let { editTaskData } = this.state
                                    editTaskData.description = e.target.value
                                    this.setState({ editTaskData })
                                }}></Input>
                        </FormGroup>

                        <FormGroup>
                            <Label for="category_id">Category Id</Label>
                            <Input
                                id="category_id"
                                value={this.state.editTaskData.category_id}
                                onChange={(e) => {
                                    let { editTaskData } = this.state
                                    editTaskData.category_id = e.target.value
                                    this.setState({ editTaskData })
                                }}></Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="due_date">Deadline</Label>
                            <Input
                                id="due_date"
                                value={this.state.editTaskData.due_date}
                                onChange={(e) => {
                                    let { editTaskData } = this.state
                                    editTaskData.due_date = e.target.value
                                    this.setState({ editTaskData })
                                }}></Input>
                        </FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.updateTask.bind(this)}>Edit Task</Button>{' '}
                        <Button color="secondary" onClick={this.toggelEditTaskModal.bind(this)}>Cancel</Button>
                    </ModalFooter>

                </Modal>

                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks}
                    </tbody>
                </Table>
            </div>
        );
    }

}


if (document.getElementById('example')) {
    ReactDOM.render(<Example />, document.getElementById('example'));
}
