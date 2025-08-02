import { getCurrentUser } from "@/lib/session";
import { constructMetadata } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DashboardHeader } from "@/components/dashboard/header";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";
import ProjectSwitcher from "@/components/dashboard/project-switcher";
import { VisaCategorySelector } from "@/components/VisaCategorySelector";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <>
      <ProjectSwitcher />
      <VisaCategorySelector language={'en'}/>
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="post" />
        <EmptyPlaceholder.Title>No content created</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have any content yet. Start creating content.
        </EmptyPlaceholder.Description>
        <Button>Add Content</Button>
      </EmptyPlaceholder>
    </>
  );
}
