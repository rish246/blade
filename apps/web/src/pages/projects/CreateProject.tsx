import { v4 } from "uuid";
import { useCreateProject } from "../../api/queries/projects";

const CreateProject = () => {
    const { mutate, isSuccess, isPending } = useCreateProject();
    console.log({ mutate });

    return (
        <div>
            {isPending && "Creating User"}
            {isSuccess && "Successfully Created User"}
            <button
                onClick={() => {
                    mutate({
                        id: v4(), // Temporary ID, should be handled by backend ideally
                        title: "New Project",
                        description: "Project description here...",
                        ownerId: "user-id-placeholder", // Replace with actual user I
                        visibility: "private",
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        lastOpenedAt: new Date(),
                    });
                }}
            >
                Create New Project
            </button>
        </div>
    );
};

export default CreateProject;
