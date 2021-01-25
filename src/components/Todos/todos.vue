<template>
    <div>
        <AddTodo />
        <FilterTodos />
        <h3>Todos</h3>
        <div class="todos">
            <div v-for="todo in allTodos" :key="todo.id" class="todo">
                {{todo.title}}
                {{todo.body}}
                <i @click="deleteTodo(todo.id)" class="fas fa-trash-alt"></i>
            </div>
        </div>
    </div>    
</template>

<script>
import FilterTodos from '../Todos/FilterTodos'
import AddTodo from '../Todos/AddTodo'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        AddTodo,
        FilterTodos
    },
    name: 'Todos',
    methods: {
        ...mapActions(['fetchTodos', 'getProfile', 'deleteTodo'])
    },
    computed: {
        ...mapGetters(['allTodos', 'getUser'])    
    },
    created() {
        this.fetchTodos()
        this.getProfile()
    },
    
}
</script>

<style scoped>
i {
    position: absolute;
    bottom: 10px;
    right: 10px;
    color: #ffffff;
    cursor: pointer;
}
.todos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 1rem;
}
.todo {
    background-color: #41b883;
    color: #ffffff;
    padding: 1rem;
    border-radius: 5px;
    text-align: center;
    position: relative;
    cursor: pointer;

}
</style>