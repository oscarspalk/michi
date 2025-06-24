<script lang="ts">
    import { createList, loadTasks } from "../components/dashboard/data/tasks";


    loadTasks()

</script>

<h1>Michi</h1>

<button onclick={async () => {
    console.log("executing this")
    await createList("hello world")
}}>
    create new list
</button>
