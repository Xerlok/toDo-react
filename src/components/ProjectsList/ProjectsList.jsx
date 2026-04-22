export default function ProjectsList ({ projects }) {
    return (
        <div className="projects-wrapper">
            <form action="" className="projects-form">
                <input type="text" placeholder="New Project Name" name="projectName" id="projectName" maxLength={40} />
                <button type="submit" className="new-todo">Add+</button>
            </form>
            <div className="projects-window">
                {projects.map(project => (
                <div key={project.id} className="project-item">{project.projectName}</div>
                ))}
            </div>
        </div>
    );
}
