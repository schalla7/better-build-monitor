// In your job-group.component.ts or a separate models file
export interface IJobCard {
  id: number;
  label_title: string;
  label_description: string;
  source_link: {
    host: string;
    jobname: string;
    joburl: string;
  }
  job: {
    "active": boolean
  },
  build: {
    build_number: number;
    running_status: "completed" | "busy_running";
    completion_result?: "green" | "red" | "yellow";
    sbr_status?: "sbr_green" | "sbr_red" | "sbr_yellow";
    start_time: string;
    end_time?: string;
  },
  view: {
    gridpos: number;
    group_label: string;
  }
  stats: {
    "last_red_days_ago": number;
    "consecutive_successes": number;

    "last_green_days_ago": number;
    "consecutive_failures": number;
  }
  

}
