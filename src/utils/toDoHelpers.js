function addProjectToState(prev, newProjectName, slug) {
    const id = crypto.randomUUID();

    return {
        ...prev,
        projects: {
            ...prev.projects,
            byID: {
                ...prev.projects.byID,
                [id]: {
                    id: id,
                    projectName: newProjectName,
                    slug: slug,
                    todoIDs: []
                }
            },
            allIDs: [...prev.projects.allIDs, id]
        } 
    };
};

function deleteProjectFromState(prev, projectId) {
    const remainingProjects = { ...prev.projects.byID };
    delete remainingProjects[projectId];

    const projectTodos = prev.projects.byID[projectId].todoIDs;
    const remainingTodos = { ...prev.todos.byID };
    projectTodos.forEach(todo => {
        delete remainingTodos[todo];
    })

    return {
        ...prev,
        projects: {
            ...prev.projects,
            byID: remainingProjects,
            allIDs: prev.projects.allIDs.filter(id => id !== projectId)
        },
        todos: {
            ...prev.todos,
            byID: remainingTodos,
            allIDs: prev.todos.allIDs.filter(id => !projectTodos.includes(id))
        }
    };
};

function saveProjectNameToState(prev, projectId, newProjectName, slug) {
    return {
        ...prev,
        projects: {
            ...prev.projects,
            byID: {
                ...prev.projects.byID,
                [projectId]: {
                    ...prev.projects.byID[projectId],
                    projectName: newProjectName,
                    slug:slug
                }
            }
        }
    };
};

function addTodoToState(prev, projectId, project, newTodoName) {
    const todoId = crypto.randomUUID();

    return {
        ...prev,
        todos: {
            ...prev.todos,
            byID: {
                ...prev.todos.byID,
                [todoId]: {
                    id: todoId,
                    todoName: newTodoName,
                    done: false,
                    projectID: projectId
                }
            },
            allIDs: [...prev.todos.allIDs, todoId]
            },
            projects: {
            ...prev.projects,
            byID: {
                ...prev.projects.byID,
                [projectId]: {
                    ...prev.projects.byID[projectId],
                    todoIDs: [...prev.projects.byID[projectId].todoIDs, todoId]
                }
            }
        }
    };
};

function deleteTodoFromState(prev, projectID, todoId) {
    const project = prev.projects.byID[projectID];

    const remainingTodos = { ...prev.todos.byID };
    delete remainingTodos[todoId];

    return {
        ...prev,
        projects:{
            ...prev.projects,
            byID: {
                ...prev.projects.byID,
                [projectID]: {
                    ...prev.projects.byID[projectID],
                    todoIDs: project.todoIDs.filter((id) => id !== todoId)
                }
            }
        },
        todos: {
            ...prev.todos,
            byID: remainingTodos,
            allIDs: prev.todos.allIDs.filter((id) => id !== todoId)
        }
    };
};

function toggleTodoInState(prev, checked, todoId) {
    return {
        ...prev,
        todos: {
            ...prev.todos,
            byID: {
                ...prev.todos.byID,
                [todoId]: {
                    ...prev.todos.byID[todoId],
                    done: checked
                }
            }
        }
    };
};

function saveTodoNameToState(prev, todoId, newName) {
    return {
        ...prev,
        todos: {
            ...prev.todos,
            byID: {
                ...prev.todos.byID,
                [todoId]: {
                    ...prev.todos.byID[todoId],
                    todoName: newName
                }
            }
        }
    };
};

export {
    addProjectToState,
    deleteProjectFromState,
    saveProjectNameToState,
    addTodoToState,
    deleteTodoFromState,
    toggleTodoInState,
    saveTodoNameToState
};
