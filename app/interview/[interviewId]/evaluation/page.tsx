"use client"

import useLocalStorage from "@/lib/hooks/uselocalstorage"

export default function EvaluationPage() {
    const [evaluation, _] = useLocalStorage("evaluation", []);

    return (
        <div>
            {evaluation}
        </div>
    )
}

