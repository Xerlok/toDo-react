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
}

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
}

export { addProjectToState, addTodoToState};
