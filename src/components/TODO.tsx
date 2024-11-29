'use client'

interface Props {
    done: boolean;
    title: string;
    description: string;
    due: Date;
}

export default function TODO(props: Props) {

    function onChange(newTodo: Props) {
        console.log(newTodo);
        props = newTodo;
    }

    return (
        <div className="flex flex-col gap-4 p-4 rounded-lg bg-gray-50">
            <input type="checkbox" 
            checked={props.done} 
            onChange={() => {
                onChange({...props, done: !props.done})
            }}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
    )
}