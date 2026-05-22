interface RootLayoutProps {
    children: React.ReactNode;
}

interface StepItem {
    id: number;
    text: string;
}

interface QuestionItem {
    q: string;
    a: string;
}

interface FaqCategory {
    id: string;
    title: string;
    questions: QuestionItem[];
}