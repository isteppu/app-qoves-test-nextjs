interface RootLayoutProps {
    children: React.ReactNode;
}

interface StepItem {
    id: number;
    text: string;
}

interface MatrixChartProps {
    isHovered: boolean;
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