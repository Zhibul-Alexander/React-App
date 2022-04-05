import { tasks, filterOptions, FILTER_STATUSES } from "./constants"
import { CheckboxGroup } from "./common"
import styles from "./styles.module.css"

const filter = FILTER_STATUSES.ALL;

const filterTasks = (filter, user) => {
    if (filter === FILTER_STATUSES.ALL) {
        return true;
    }
    if (filter === FILTER_STATUSES.FULFILLED) {
        return user.isDone;
    }
    return !user.isDone;
}

export function Todo() {
    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1 className={styles.header__title}>Todo App</h1>
                <form>
                    <input className={styles.header__input} placeholder="Task ..." />
                    <button type="button" className={styles.header__button}>Add task</button>
                </form>
                <div className={styles.header__checkbox}>
                    <CheckboxGroup options={filterOptions} value={FILTER_STATUSES.ALL} />
                </div>
            </header>
            <main className={styles.main}>
                {tasks.filter((task) => filterTasks(filter, task)).map(({ id, label, isDone }) => {
                    return (
                        <div className={styles.main__tasks} key={id}>
                            <div><input className={styles.main__checkbox} type="checkbox" checked={isDone} />{label}</div>
                            {isDone && <button className={styles.main__button}>✕</button>}
                        </div>)
                })}
            </main>
        </div>
    );
}
