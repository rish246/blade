import { v4 } from "uuid";
import { useCreateProject } from "../../api/queries/projects";
import { Button } from "@blade/ui";

const generateRandomProjectTitle = () => {
    return;
};

const CreateProject = () => {
    const { mutate, isSuccess, isPending } = useCreateProject();

    return (
        <div>
            {isPending && "Creating User"}
            {isSuccess && "Successfully Created User"}
            <Button
                onClick={() => {
                    mutate({
                        id: v4(), // Temporary ID, should be handled by backend ideally
                        title: "New Project + " + v4(),
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
            </Button>
        </div>
    );
};

export default CreateProject;
