import { useEffect } from "react";

export default function MainWindow({ projects, setProjects }) {

    useEffect(() => {
    const testProject1 = { projectName: 'kek project 1', todos: [] };
    const testProject2 = { projectName: 'kek project 2', todos: [] };

    setProjects(prev => [testProject2, testProject1, ...prev]);
}, [setProjects]);
    
    return (
        <div>
            {projects.map(project => (
                <div>{project.projectName}</div>
            ))}
        </div>
    );
};
