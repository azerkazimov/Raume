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