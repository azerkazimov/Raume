
## Что такое SWR?

**SWR** (stale-while-revalidate) - это библиотека для fetching данных в React, созданная командой Vercel. Она обеспечивает кеширование, повторную валидацию, фокусировку, повторные запросы и многое другое из коробки.

**Принцип работы:** Сначала возвращает данные из кеша (stale), затем отправляет запрос (revalidate), и наконец обновляет данные.

## Установка

```bash
npm install swr
# или
yarn add swr
# или
pnpm add swr
```

## 1. Базовое использование

### Простой пример

```javascript
import useSWR from 'swr'

// Fetcher функция
const fetcher = (url) => fetch(url).then((res) => res.json())

function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher)

  if (error) return <div>Ошибка загрузки</div>
  if (isLoading) return <div>Загрузка...</div>

  return <div>Привет, {data.name}!</div>
}
```

### С async/await

```javascript
const fetcher = async (url) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Ошибка при загрузке данных')
  }
  return res.json()
}
```

## 2. Глобальная конфигурация

### _app.js

```javascript
import { SWRConfig } from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig 
      value={{
        fetcher,
        refreshInterval: 3000, // обновление каждые 3 сек
        revalidateOnFocus: false, // не обновлять при фокусе
        revalidateOnReconnect: true, // обновлять при восстановлении связи
        dedupingInterval: 2000, // дедупликация запросов
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}
```

## 3. Продвинутое использование

### Условные запросы

```javascript
function Profile({ userId }) {
  // Запрос выполняется только если userId существует
  const { data, error } = useSWR(
    userId ? `/api/user/${userId}` : null,
    fetcher
  )

  return <div>{data?.name || 'Загрузка...'}</div>
}
```

### Зависимые запросы

```javascript
function Profile() {
  const { data: user } = useSWR('/api/user', fetcher)
  const { data: projects } = useSWR(
    user ? `/api/projects?owner=${user.id}` : null,
    fetcher
  )

  return (
    <div>
      <h1>{user?.name}</h1>
      <ul>
        {projects?.map(project => (
          <li key={project.id}>{project.name}</li>
        ))}
      </ul>
    </div>
  )
}
```

### Локальное состояние

```javascript
import useSWR, { mutate } from 'swr'

function TodoList() {
  const { data: todos, error } = useSWR('/api/todos', fetcher)

  const addTodo = async (text) => {
    // Оптимистичное обновление
    mutate('/api/todos', [...todos, { id: Date.now(), text }], false)

    try {
      await fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify({ text }),
        headers: { 'Content-Type': 'application/json' }
      })
      
      // Повторная валидация
      mutate('/api/todos')
    } catch (error) {
      // Откат при ошибке
      mutate('/api/todos', todos, false)
    }
  }

  return (
    <div>
      {todos?.map(todo => <div key={todo.id}>{todo.text}</div>)}
      <button onClick={() => addTodo('Новая задача')}>
        Добавить
      </button>
    </div>
  )
}
```

## 4. Пагинация

### Бесконечная загрузка с useSWRInfinite

```javascript
import useSWRInfinite from 'swr/infinite'

const getKey = (pageIndex, previousPageData) => {
  if (previousPageData && !previousPageData.data.length) return null // достигли конца
  return `/api/posts?page=${pageIndex}&limit=10`
}

function Posts() {
  const {
    data,
    error,
    mutate,
    size,
    setSize,
    isValidating,
    isLoading
  } = useSWRInfinite(getKey, fetcher)

  const posts = data ? data.flatMap(page => page.data) : []
  const isLoadingMore = isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.data.length === 0
  const isReachingEnd = isEmpty || (data && data[data.length - 1]?.data.length < 10)

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
      
      <button
        disabled={isLoadingMore || isReachingEnd}
        onClick={() => setSize(size + 1)}
      >
        {isLoadingMore ? 'Загрузка...' : isReachingEnd ? 'Больше нет данных' : 'Загрузить ещё'}
      </button>
    </div>
  )
}
```

### Обычная пагинация

```javascript
import { useState } from 'react'
import useSWR from 'swr'

function PaginatedPosts() {
  const [page, setPage] = useState(1)
  const { data, error } = useSWR(`/api/posts?page=${page}&limit=10`, fetcher)

  return (
    <div>
      {data?.posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
      
      <div>
        <button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}
        >
          Предыдущая
        </button>
        <span>Страница {page}</span>
        <button 
          onClick={() => setPage(page + 1)}
          disabled={!data?.hasNext}
        >
          Следующая
        </button>
      </div>
    </div>
  )
}
```

## 5. Обработка ошибок

### Глобальная обработка ошибок

```javascript
// _app.js
const fetcher = async (url) => {
  const res = await fetch(url)
  
  if (!res.ok) {
    const error = new Error('Произошла ошибка при загрузке данных.')
    error.info = await res.json()
    error.status = res.status
    throw error
  }
  
  return res.json()
}

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig 
      value={{
        fetcher,
        onError: (error, key) => {
          if (error.status !== 403 && error.status !== 404) {
            // Отправляем ошибку в сервис логирования
            console.error('SWR Error:', error, key)
          }
        }
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}
```

### Локальная обработка ошибок

```javascript
function Profile() {
  const { data, error, isLoading } = useSWR('/api/user', fetcher, {
    onError: (error) => {
      console.log('Ошибка загрузки профиля:', error)
    }
  })

  if (error) {
    return (
      <div className="error">
        <h3>Что-то пошло не так</h3>
        <p>{error.message}</p>
        <button onClick={() => mutate('/api/user')}>
          Повторить
        </button>
      </div>
    )
  }

  if (isLoading) return <div>Загрузка...</div>
  
  return <div>Привет, {data.name}!</div>
}
```

## 6. Мутации данных

### mutate() функция

```javascript
import useSWR, { mutate } from 'swr'

// Глобальная мутация
mutate('/api/user')

// С данными (оптимистичное обновление)
mutate('/api/user', newUserData, false)

// Внутри компонента
function Profile() {
  const { data, mutate: localMutate } = useSWR('/api/user', fetcher)

  const updateProfile = async (userData) => {
    try {
      // Оптимистичное обновление
      await localMutate(userData, false)
      
      // Отправка на сервер
      await fetch('/api/user', {
        method: 'PUT',
        body: JSON.stringify(userData)
      })
      
      // Повторная валидация
      localMutate()
    } catch (error) {
      // Обработка ошибки
      console.error('Ошибка обновления:', error)
    }
  }

  return (
    <div>
      <h1>{data?.name}</h1>
      <button onClick={() => updateProfile({ name: 'Новое имя' })}>
        Обновить
      </button>
    </div>
  )
}
```

## 7. API Routes в Next.js

### pages/api/users.js

```javascript
export default function handler(req, res) {
  if (req.method === 'GET') {
    const users = [
      { id: 1, name: 'Иван', email: 'ivan@example.com' },
      { id: 2, name: 'Петр', email: 'petr@example.com' },
    ]
    res.status(200).json(users)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
```

### pages/api/users/[id].js

```javascript
export default function handler(req, res) {
  const { id } = req.query
  
  if (req.method === 'GET') {
    const user = { id, name: `Пользователь ${id}`, email: `user${id}@example.com` }
    res.status(200).json(user)
  } else if (req.method === 'PUT') {
    // Обновление пользователя
    const updatedUser = { id, ...req.body }
    res.status(200).json(updatedUser)
  } else {
    res.setHeader('Allow', ['GET', 'PUT'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
```

## 8. Кеширование и производительность

### Настройки кеширования

```javascript
const { data } = useSWR('/api/data', fetcher, {
  refreshInterval: 0, // отключить автоматическое обновление
  revalidateOnFocus: false, // не обновлять при фокусе окна
  revalidateOnReconnect: true, // обновлять при восстановлении соединения
  revalidateIfStale: true, // обновлять устаревшие данные
  dedupingInterval: 2000, // интервал дедупликации (мс)
  errorRetryInterval: 5000, // интервал повтора при ошибке
  errorRetryCount: 3, // количество повторов при ошибке
  focusThrottleInterval: 5000 // троттлинг обновления при фокусе
})
```

### Предзагрузка данных

```javascript
import { mutate } from 'swr'

// Предзагрузка при hover
const handleMouseEnter = () => {
  mutate('/api/user-details')
}

function UserCard() {
  return (
    <div onMouseEnter={handleMouseEnter}>
      <Link href="/user-details">
        Детали пользователя
      </Link>
    </div>
  )
}
```

## 9. TypeScript поддержка

### Типизация данных

```typescript
interface User {
  id: number
  name: string
  email: string
}

interface ApiResponse<T> {
  data: T
  message: string
}

function Profile() {
  const { data, error, isLoading } = useSWR<ApiResponse<User>>(
    '/api/user',
    fetcher
  )

  if (error) return <div>Ошибка: {error.message}</div>
  if (isLoading) return <div>Загрузка...</div>

  return <div>Привет, {data?.data.name}!</div>
}
```

### Типизированный fetcher

```typescript
const fetcher = <T>(url: string): Promise<T> =>
  fetch(url).then(res => res.json())

// Использование
const { data } = useSWR<User[]>('/api/users', fetcher)
```

## 10. Паттерны и лучшие практики

### Custom hook для API

```javascript
// hooks/useUser.js
import useSWR from 'swr'

export function useUser(id) {
  const { data, error, mutate } = useSWR(
    id ? `/api/users/${id}` : null,
    fetcher,
    {
      revalidateOnFocus: false
    }
  )

  return {
    user: data,
    isLoading: !error && !data,
    isError: error,
    updateUser: mutate
  }
}

// Использование
function Profile({ userId }) {
  const { user, isLoading, isError, updateUser } = useUser(userId)

  if (isError) return <div>Ошибка загрузки</div>
  if (isLoading) return <div>Загрузка...</div>

  return <div>{user.name}</div>
}
```

### Обработка форм с SWR

```javascript
import { useState } from 'react'
import useSWR, { mutate } from 'swr'

function UserForm() {
  const [formData, setFormData] = useState({ name: '', email: '' })
  const [submitting, setSubmitting] = useState(false)
  const { data: users } = useSWR('/api/users', fetcher)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Оптимистичное обновление
      const newUser = { id: Date.now(), ...formData }
      mutate('/api/users', [...users, newUser], false)

      // Отправка на сервер
      await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      // Очистка формы
      setFormData({ name: '', email: '' })
      
      // Повторная валидация
      mutate('/api/users')
    } catch (error) {
      // Откат при ошибке
      mutate('/api/users', users, false)
      console.error('Ошибка создания пользователя:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Имя"
        required
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
      />
      <button type="submit" disabled={submitting}>
        {submitting ? 'Создание...' : 'Создать пользователя'}
      </button>
    </form>
  )
}
```

## 11. Middleware и трансформация данных

### Трансформация данных

```javascript
const { data } = useSWR('/api/posts', async (url) => {
  const posts = await fetcher(url)
  return posts.map(post => ({
    ...post,
    createdAt: new Date(post.createdAt),
    excerpt: post.content.substring(0, 100) + '...'
  }))
})
```

### Middleware

```javascript
import useSWR from 'swr'

function withAuth(useSWRNext) {
  return (key, fetcher, config) => {
    const extendedFetcher = (url) => {
      return fetcher(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
    }

    return useSWRNext(key, extendedFetcher, config)
  }
}

// Использование
const { data } = useSWR('/api/protected', fetcher, {
  use: [withAuth]
})
```

## Заключение

SWR - мощная библиотека для управления состоянием асинхронных данных в React приложениях. Она особенно хорошо подходит для Next.js проектов благодаря простоте использования и богатому функционалу из коробки.

### Ключевые преимущества:

- Автоматическое кеширование
- Повторная валидация данных
- Оптимистичные обновления
- Обработка состояний загрузки и ошибок
- TypeScript поддержка
- Небольшой размер бандла
- Отличная производительность