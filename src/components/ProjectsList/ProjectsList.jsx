import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import styles from './ProjectsList.module.css'
import { Link } from "react-router-dom";
import makeSlug from "../../utils/makeSlug";
import { addProjectToState, deleteProjectFromState, saveProjectNameToState } from "../../utils/toDoHelpers";
import { input } from "@testing-library/user-event/dist/cjs/event/input.js";

export default function ProjectsList () {
    const { state, setState } = useOutletContext();
    const [ projectMenuId, setProjectMenuId ] = useState(null);

    const [editedProjectId, setEditedProjectId] = useState(null);
    const [editedText, setEditedText] = useState("");

    function addProject(e) {
        e.preventDefault();
        const newProjectName = e.target.projectName.value;
        const slug = makeSlug(newProjectName);

        setState(prev => addProjectToState(prev, newProjectName, slug));

        e.target.projectName.value = '';
    };

    function deleteProject(projectId) {
        setState(prev => deleteProjectFromState(prev, projectId));
    };

    function renameProject(projectId) {
        const newProjectName = editedText.trim();

        if (!newProjectName) return;

        setState(prev => saveProjectNameToState(prev, projectId, newProjectName));

        setEditedProjectId(null);
    }

    function deleteAll() {
        setState({
            projects: {
                byID: {},
                allIDs: []
            },
            todos: {
                byID: {},
                allIDs: []
            }
        })
    };

    return (
        <div className={styles["projects-wrapper"]}>
            <form action="" className={styles["projects-form"]} onSubmit={addProject}>
                <input
                    type="text"
                    placeholder="New Project Name"
                    name="projectName"
                    className={styles["projectName"]}
                    maxLength={40}
                />
                <button type="submit" className={styles["new-project"]}>Add+</button>
            </form>
            <div className={styles["projects-window"]}>
                {state.projects.allIDs.map(projectID => {
                    const project = state.projects.byID[projectID];
                    
                    return (
                        <div key={project.id} data-id={project.id} className={styles["project-item"]}>
                            {editedProjectId === project.id ? (
                                <input
                                    type="text"
                                    value={editedText}
                                    autoFocus
                                    maxLength={40}
                                    className={styles["project-name"]}
                                    onChange={(e) => setEditedText(e.target.value)}
                                    onBlur={() => renameProject(project.id)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            renameProject(project.id);
                                        }
                                        if (e.key === "Escapre") {
                                            setEditedProjectId(null);
                                        }
                                    }}
                                />
                            ) : (
                                <Link
                                    className={styles["project-name"]}
                                    to={`/projects/${project.id}/${project.slug}`}
                                >{project.projectName}</Link>
                            )}
                            
                            <button
                                className={styles["project-kebab"]}
                                onClick={() => {
                                    setProjectMenuId(
                                        projectMenuId === project.id 
                                            ? null
                                            : project.id
                                    );
                                }}
                            >⋮</button>

                            {projectMenuId === project.id && (
                                <div className={styles["project-menu"]}>
                                    <button
                                        className={styles["project-rename-btn"]}
                                        onClick={() => {
                                            setEditedProjectId(project.id);
                                            setEditedText(project.projectName)
                                            setProjectMenuId(null);
                                        }}
                                    >Rename</button>

                                    <button
                                    className={styles["project-move-btn"]}
                                    onClick={() => {
                                        setProjectMenuId(null);
                                    }}
                                    >Move</button>

                                    <button
                                        className={styles["project-delete-btn"]}
                                        onClick={() => {
                                            deleteProject(project.id);
                                            setProjectMenuId(null);
                                        }}
                                    >Delete</button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <button onClick={deleteAll}>Delete all</button>
        </div>
    );
}
