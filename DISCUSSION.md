I organized my repository into three branches that solve for three different tasks. I created pull requests for the corresponding branches

main branch - initial project code -> [repository](https://github.com/ridhwaans/solace-assignment)  
task-1 branch based on main branch -> Fix glaring bugs & anti-patterns -> [PR #1](https://github.com/ridhwaans/solace-assignment/pull/1)   
task-2 branch based on task-1 branch -> UI UX design improvements -> [PR #2](https://github.com/ridhwaans/solace-assignment/pull/2)  
task-3 branch based on task-2 branch -> frontend & backend performance improvements -> [PR #3](https://github.com/ridhwaans/solace-assignment/pull/3)  

I aimed to have small diffs for the pull requests. If there is a large block of code in the PR, it should be Tailwind CSS  
In my limited time, I have a satisfactory solution with improvements added on the frontend and backend, assuming we have a database of hundreds of thousands of rows.  
Since this is a single page app, single DB table, high reads & non writes, I did not want to add unnecessary complexity. I focused on the requirements, and react integration with the API & database  
I have experience with Prisma and Drizzle. In my opinion the former is more mature, but I still got the job done with the versatile postgres client  
Also, I wanted to respect the following requirement in the project description:  

> Please make all API calls to the NextJS backend and avoid Next server actions.

As a result, I kept the client components (with `use client`) and did not use server actions or react server components

If I had more time, here are the goals and non-goals I would explore in no particular order: 

- This is a nitpick but in `src/db/schema.ts`, I would update the specialties db column name from 'payload' to 'specialties' and change phonenumber datatype from bigint to text or varchar to avoid unintentional truncation & support native string search. However it wasnt a blocker and I didnt want to diverge too much 
- I usually do not like prop drilling so instead of passing advocate data from Home page to Table to TableRow, I would implement a react context and start a provider to share data between components.
- I usually do not like having a ton of react state in one or two client components, and I would move to react context & hooks
- Currently, my solution features advocate data & sorting by a single field. I will let the user to select or filter by multiple columns, and multiple column ordering. To achieve this, I will implement more React controls, and modify the API and Drizzle queries to support more complex queries
- If my database hypothetically has hundreds of thousands of advocate rows, fetching all records is inefficient and can overload DB & memory. In the use case of selecting all, 1) I will implement a combination of LIMIT and batch requests to safely process all rows. 2) I will investigate using SQL cursor in Drizzle postgres client for streaming results (https://orm.drizzle.team/docs/guides/cursor-based-pagination)
- I would utilize Drizzle's `.$dynamic()` and query builder and refactor some of my query code (https://orm.drizzle.team/docs/dynamic-query-building)
- I will optimize component re-renders by leveraging memoization and React useCallback hooks
- I will investigate what are most frequent search queries, then introduce caching at the application level to avoid unnecessary database calls of repeated queries. Probably setup Redis on the edge runtime to play well with Nextjs constraints
- In production, if there is a really common search query for advocates, I would look into caching the database result as a view (virtual table) through the Drizzle client (https://orm.drizzle.team/docs/views)
- I would probably refactor some of my tailwind CSS by setting up a classnames or clsx package to conditionally join CSS classes for resuability 
- I will implement a caching and stale data invalidation pattern for requests by changing the fetch API to SWR (https://swr.vercel.app/) or React Query. For the following reasons:
  - Advocate data is static and read only 
  - We will most probably filter and paginate the data on client side after the initial fetch 
  - We want to reduce the APIs on hard refresh or tab switch

Below are out-of-scope ideas:
- I initially didnt prefer an ascending/ descending clickable sort filter on the phone number column header in the React table component. If I had additional time I can add it arbitrarily and there is no requirement on phone number sort
- I will add a new query param to specify a db LIMIT when fetching all advocates on top of pagination 
- Extend linting rules for better developer experience such as auto formatting on save
- Create React helpers for common logic in Home & child components. Organize project structure for hooks, libs and utils & shared functions
- Create server side helpers for some of the API client logic 
- I will check for data contention or high reads. Using commands such as EXPLAIN SELECT & PLAN, I would add missing indexes to speed up database performance. 
- I would review my Drizzle client code to fetch data in a single query rather than making separate queries for each row to prevent N+1 issues
- I would improve accessibility by adding keyboard support and ARIA in CSS and HTML
- I would perform a performance assessment and test the application on different browsers for various security compability with localhost self signed certificates, responsiveness, accessibility. I can define core web vitals such as page load time, first contentful paint and viewport load times. It is out of scope, but I can use this information to build a metrics observability dashboard
- Out of scope, I will implement API rate limiting and request throttling in nextjs middleware. It is a good foundation for scaling production
- Out of scope, I can setup database & application performance monitoring to observe p90 request outcomes, latency & database health