export type WorkItem = {
  slug: string;
  title: string;
  clientDisplay: string;
  attribution: string;
  contribution: string;
  disciplines: string[];
  year: string;
  summary: string;
  permissionsStatus: "approved" | "pending";
  featured: boolean;
};

// Publication gate: only approved, accurately attributed records belong here.
// Media Intake B01 remains outside this array until credits and permissions are frozen.
export const workItems: WorkItem[] = [];
