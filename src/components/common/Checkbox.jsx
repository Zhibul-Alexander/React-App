import styles from "../styles.module.css"


function Checkbox({ label, value, checked }) {
    return (
        <label className={styles.header__label}>
            <input className={styles.header__checked} type="radio" name="tasks" value={value} checked={checked} />
            {label}
        </label>
    );
}

export const CheckboxGroup = ({ value: groupValue, options }) => {
    return (
        <>
            {options.map(({ value, label }) =>
                <Checkbox value={value} label={label} checked={value === groupValue} />)}
        </>
    );
}
