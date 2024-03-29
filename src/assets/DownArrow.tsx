interface IconProps {
    color: string
}

export default function DownArrow ({ color }: IconProps) {
    return (
        <svg width="12" height="8" viewBox="0 0 36 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 18L0.679491 -3.26266e-06L35.3205 -2.34249e-07L18 18Z" fill={color}/>
        </svg>
    )
}