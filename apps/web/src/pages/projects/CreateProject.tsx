import { useCreateProject } from "../../api/queries/projects";

const CreateProject = () => {
    const { mutate, isSuccess, isPending } = useCreateProject();

    return (
        <div>
            {isPending && "Creating User"}
            {isSuccess && "Successfully Created User"}
            <button
                onClick={() => {
                    mutate({
                        id: Math.random().toString(36).substring(2, 15), // Temporary ID, should be handled by backend ideally
                        title: "New Project",
                        description: "Project description here...",
                        ownerId: "user-id-placeholder", // Replace with actual user I
                        visibility: "private",
                    });
                }}
            >
                Create New Project
            </button>
        </div>
    );
};

export default CreateProject;
