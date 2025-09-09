HOMEWORK TASK:
1. на основе signup прописанный через Prisma, написать signin чтобы login работал корректно и заходил на dashboard
2. Пофиксить bug связанный с добавлением продуктов в корзину, при нажатии добавлении одного и тогоже продукта в корзину должен увеличиваться счетчик, а не повторно добавляться продукт
3. ....
4.Создать динамическию страницу для просмотра Reviews написать правильную логику для компонента ReviewIdPage и добавить в компоненте ReviewsPage 
<Link href={`/reviews/${review.id}`} key={review.id}>
            <div
              key={review.content}
              className="p-4 border rounded-md border-gray-200 pb-4 flex flex-col gap-2 items-center justify-center"
            >
              <h1>{review.content}</h1>
              <p>{review.rating}</p>
            </div>
          </Link>
для перехода на страницу

5. Повторить логику "Отзывов (Reviews)" в вашем проекте с полным пакетом REST FULL API (GET, POST, PUT(UPDATE), DELETE).
Связать все с базой данных через Prisma ORM
Использовать при этом => react hook form | zod validator (yup, formik)
А также отобразить отзывы на пользовательский страницах

6. Создать CRUD логику для страницы "Comments" 
- интегрировать prisma schema на страницу
- на dashboard/comments странице использовать react-hook-form и zod 
- создать route.ts файлы с логикой для CRUD операций (GET, PUT, POST, DELETE)
- на страницaх comments и comments/[id]  использовать библиотеку useSWR для обработки запроса в клиентских компонентах