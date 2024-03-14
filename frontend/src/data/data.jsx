const data = [
    {
        "title": "Meeting Notes",
        "content": "Discuss project timelines and milestones.",
        "desc": "Notes from the team meeting on project planning.",
        "author": "634f6fb82cbe5b234ff93b70",
        "sharedWith": ["634f6fb82cbe5b234ff93b71", "634f6fb82cbe5b234ff93b72"],
        "createdAt": "2024-03-14T10:00:00.000Z",
        "updatedAt": "2024-03-14T10:00:00.000Z"
    },
    {
        "title": "Conference Highlights",
        "content": "Key takeaways from the annual tech conference.",
        "desc": "Summary of important announcements and tech trends.",
        "author": "634f6fb82cbe5b234ff93b73",
        "sharedWith": [],
        "createdAt": "2024-03-13T09:00:00.000Z",
        "updatedAt": "2024-03-13T09:00:00.000Z"
    },
    {
        "title": "Product Launch Plan",
        "content": "Detailed plan for the upcoming product launch, including marketing strategies and timelines.",
        "desc": "Complete overview of the launch strategy for the new product line.",
        "author": "634f6fb82cbe5b234ff93b74",
        "sharedWith": ["634f6fb82cbe5b234ff93b75"],
        "createdAt": "2024-03-12T08:00:00.000Z",
        "updatedAt": "2024-03-12T08:00:00.000Z"
    },
    {
        "title": "Quarterly Review",
        "content": "Analysis of the quarterly performance metrics and objectives.",
        "desc": "A detailed report on the company's performance in the past quarter.",
        "author": "634f6fb82cbe5b234ff93b76",
        "sharedWith": ["634f6fb82cbe5b234ff93b77", "634f6fb82cbe5b234ff93b78"],
        "createdAt": "2024-03-11T07:00:00.000Z",
        "updatedAt": "2024-03-11T07:00:00.000Z"
    },
    {
        "title": "Research Findings",
        "content": "Comprehensive analysis of recent research findings in our field.",
        "desc": "Document includes detailed observations and implications of the latest research.",
        "author": "634f6fb82cbe5b234ff93b79",
        "sharedWith": ["634f6fb82cbe5b234ff93b7a"],
        "createdAt": "2024-03-10T06:00:00.000Z",
        "updatedAt": "2024-03-10T06:00:00.000Z"
    },
    {
        "title": "Budget Proposal",
        "content": "Proposal for the next fiscal year's budget, focusing on departmental allocations.",
        "desc": "Detailed proposal outlining the budget requirements and justifications for each department.",
        "author": "634f6fb82cbe5b234ff93b7b",
        "sharedWith": [],
        "createdAt": "2024-03-09T05:00:00.000Z",
        "updatedAt": "2024-03-09T05:00:00.000Z"
    },
    {
        "title": "System Upgrade Memo",
        "content": "Notification and details regarding the upcoming system upgrade.",
        "desc": "Memo outlines the scope, impact, and schedule of the system upgrade.",
        "author": "634f6fb82cbe5b234ff93b7c",
        "sharedWith": ["634f6fb82cbe5b234ff93b7d"],
        "createdAt": "2024-03-08T04:00:00.000Z",
        "updatedAt": "2024-03-08T04:00:00.000Z"
    },
    {
        "title": "Training Schedule",
        "content": "The schedule for the upcoming employee training sessions.",
        "desc": "Details on the dates, topics, and instructors for the new training program.",
        "author": "634f6fb82cbe5b234ff93b7e",
        "sharedWith": ["634f6fb82cbe5b234ff93b7f", "634f6fb82cbe5b234ff93b80"],
        "createdAt": "2024-03-07T03:00:00.000Z",
        "updatedAt": "2024-03-07T03:00:00.000Z"
    },
    {
        "title": "Project Roadmap",
        "content": "Outline of the major milestones and deadlines for the current project.",
        "desc": "A strategic document detailing the timeline, goals, and key deliverables for the project.",
        "author": "634f6fb82cbe5b234ff93b81",
        "sharedWith": ["634f6fb82cbe5b234ff93b82"],
        "createdAt": "2024-03-06T02:00:00.000Z",
        "updatedAt": "2024-03-06T02:00:00.000Z"
    },
    {
        "title": "Safety Protocol Update",
        "content": "Updated guidelines and protocols for maintaining safety in the workplace.",
        "desc": "The document outlines the revised safety measures and procedures to ensure employee wellbeing.",
        "author": "634f6fb82cbe5b234ff93b83",
        "sharedWith": [],
        "createdAt": "2024-03-05T01:00:00.000Z",
        "updatedAt": "2024-03-05T01:00:00.000Z"
    },
    {
        "title": "Client Feedback Report",
        "content": "Summary of client feedback from the recent survey, including suggestions and areas for improvement.",
        "desc": "Comprehensive report detailing customer satisfaction levels and feedback on our services.",
        "author": "634f6fb82cbe5b234ff93b84",
        "sharedWith": ["634f6fb82cbe5b234ff93b85"],
        "createdAt": "2024-03-04T12:00:00.000Z",
        "updatedAt": "2024-03-04T12:00:00.000Z"
    },
    {
        "title": "Strategic Plan Outline",
        "content": "The framework for our strategic plan over the next five years, focusing on growth and innovation.",
        "desc": "Outline of the key strategies, objectives, and actions planned to achieve long-term goals.",
        "author": "634f6fb82cbe5b234ff93b86",
        "sharedWith": ["634f6fb82cbe5b234ff93b87", "634f6fb82cbe5b234ff93b88"],
        "createdAt": "2024-03-03T11:00:00.000Z",
        "updatedAt": "2024-03-03T11:00:00.000Z"
    },
    {
        "title": "Operational Efficiency Report",
        "content": "Analysis of the operational efficiency within the company, with recommendations for improvements.",
        "desc": "The report provides an in-depth look at current operations and suggests ways to enhance efficiency.",
        "author": "634f6fb82cbe5b234ff93b89",
        "sharedWith": [],
        "createdAt": "2024-03-02T10:00:00.000Z",
        "updatedAt": "2024-03-02T10:00:00.000Z"
    },
    {
        "title": "New Hire Orientation Guide",
        "content": "A comprehensive guide for onboarding new employees, including policies, procedures, and company culture.",
        "desc": "This guide is designed to help new hires integrate smoothly and effectively into the company.",
        "author": "634f6fb82cbe5b234ff93b8a",
        "sharedWith": ["634f6fb82cbe5b234ff93b8b"],
        "createdAt": "2024-03-01T09:00:00.000Z",
        "updatedAt": "2024-03-01T09:00:00.000Z"
    }
];

export default data;