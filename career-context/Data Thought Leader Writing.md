Most personal websites are blind.

You don’t know what people actually do when they visit.

I added GA4 \+ GTM and built a small dashboard in Data (Looker) Studio to track behavior.

Even with low traffic, the signal is clear:  
– visitors aren’t just landing  
– they’re interacting

On average: \~9+ interactions per session

Nothing fancy:  
– event tracking  
– a few custom clicks  
– simple dashboarding

All free.

Treat your site like a product and it stops being a static page.

Next step: adding UTMs to understand where traffic is actually coming from.

---

Perfect marketing stacks are losing to fast, opinionated tools.

Sitting through vendor demos lately, a pattern is pretty clear:

A lot of newer platforms (Zeta, NinjaCat, Avid AI, etc.) aren’t trying to replace CDPs, DSPs, or personalization engines outright.

They’re taking the most useful parts of each and packaging them into streamlined, opinionated tools for specific use cases.

• Performance marketing agencies  
• Nonprofits  
• Mid-sized brands that need speed over complexity

And they’re gaining real traction.

Because most teams don’t actually need a pristine, fully composable marketing stack.

They need:  
• speed to insight  
• speed to activation  
• speed to impact

The traditional model was:  
assemble best-in-class tools → integrate everything → build the “perfect” system

The new model is:  
use a tool that gets you 80% of the way there, fast

This doesn’t replace enterprise stacks.

But for a large segment of teams, speed and focus are winning over flexibility and completeness.

Perfect systems are losing to fast, opinionated systems.

Not because they’re better in theory  
but because they win in execution

Feels very similar to what we’re seeing on the data side too, where teams are choosing speed and usability over perfectly modeled systems.

Curious if others are seeing this shift across their orgs or clients.

---

Not every app backend should be Postgres.

Sometimes BigQuery is actually the better choice.

It sounds wrong at first.

Because we’re taught:  
Postgres \= app database  
BigQuery \= analytics

But it really comes down to the shape of the problem.

If your app is:  
• high write frequency  
• transactional  
• row-level operations

Postgres makes sense.

But if your app is:  
• aggregating large volumes of data  
• computing metrics across time  
• powering dashboards or insights

You’re basically building an analytics engine.

And BigQuery is built for that.

I’ve been working on something that processes timesheet data across employees, clients, and work types.

The moment I stopped thinking  
“what database should I use for my app?”

and started thinking  
“what engine best fits the workload?”

everything got clearer.

Postgres and BigQuery aren’t competitors.

They’re optimized for completely different problems.

The mistake is trying to force one to do the job of the other.

Curious how others think about this. Have you ever used an analytics warehouse as an app backend?

---

I used to think good data teams needed better documentation. Now I think they need better systems.

At my last role, we had a detailed wiki. But I rarely read it.

What actually shaped how I worked was:

how things were already named  
how models were structured  
what got approved in PRs  
what made it to production

The environment enforced the standard. Not the document.

As I think about growing a team now, I’m realizing: If the right way isn’t the easiest way, it won’t stick.

So instead of writing more docs, I’m focusing on:  
templates  
default patterns  
lightweight enforcement

Because standards don’t live in Confluence.  
They live in the system.

---

Companies love to say they’re “data-driven.”  
But there’s a big difference between showing data and producing intelligence.

Raw data looks like sensor logs, transactions, events.

Intelligence looks like:  
• summarized assessments  
• interpretations  
• probability-based insights  
• decision-ready recommendations

That’s what organizations like the CIA actually produce. Not raw feeds.  
They convert information → meaning → decisions.

There’s actually a formal version of this idea: the DIKW pyramid  
Data → Information → Knowledge → Wisdom

Most data teams stop at the bottom layers.  
Dashboards \= information  
Some aggregation \= knowledge

But very few teams are actually producing intelligence that drives decisions.  
And that’s the real job.

Not collecting data.  
Not even visualizing it.

Turning it into something people can act on.

What about y’all? How much of your work is turning messy data into decisions vs just reporting it?

---

Something interesting is happening in analytics stacks.

Fast-moving companies increasingly don’t want to be locked into a BI tool.

Instead they’re building stacks that look like:  
Warehouse  
Semantic Layer  
Open-source BI / AI tools

Why?  
Because once the semantic layer defines:  
metrics  
business logic  
relationships

The visualization tool becomes almost interchangeable.

Dashboards, notebooks, and AI agents can all sit on top of the same definitions.  
Which flips the traditional stack.

Instead of:  
BI tool → definitions → dashboards

It becomes:  
Semantic model → everything else.

The BI tool becomes the least important part of the stack.

Curious how teams are actually implementing this: are you centralizing metrics in dbt/semantic layers or still defining logic in the BI tool?

---

Vibe-coding a full-stack app taught me something foundational to data engineering that I’d never fully appreciated before: normalization.

I was building the Supabase backend for a small internal tool to explore timesheet data.

My first instinct was to import one wide table with everything I needed:  
employee name  
department  
manager  
date  
hours

And honestly, it worked fine at first.

But as the data grew, I started to feel a tug on performance. Nothing was breaking, but the queries were clearly doing more work than they should.

That’s when I had an idea.

What if I moved all the repeating employee attributes (names, departments, roles) into their own table so the app wasn't querying the same information over and over?

I had just reinvented normalization.

And I’ve been working with 3NF architectures my entire career\! I’d just never understood it from a first-principles perspective.

Sometimes the solution isn’t another optimization, caching strategy, or fancy query trick.

Sometimes it’s just modeling the data properly.

Curious how other data folks approach this:  
When you’re building internal apps or analytics tools, do you start with wide denormalized tables for speed, or model facts and dimensions early on?

---

I used to work with datasets under \~1M rows.

At that scale I was comfortable exposing row-level data to dashboards so users could “investigate the data themselves”.

They almost never did.

Then the dataset grew.

Suddenly dashboards took forever to load.

That’s when it clicked:

Dashboards aren’t really meant to expose raw data.  
They exist to return aggregated answers quickly.

That realization explains a lot of things:

why OLAP systems exist  
why warehouses optimize for aggregations  
why semantic layers matter  
why dashboards often hide raw tables

The UI isn’t the product.  
The aggregated answer is.

What’s a system design decision that only made sense after you hit scale?

---

Marketers are starting to query their own data...and it’s going to break a lot of data teams.

Been playing with the new AI chat feature in [Supermetrics](https://www.linkedin.com/company/supermetrics/), and it’s honestly kind of wild.

Instead of:  
“Hey data team, can you pull X?”  
→ wait 1–2 days  
→ clarification loops  
→ dashboard refresh

It’s now:  
“Why did Meta CPA spike last week?”  
→ answer in seconds

Does it replace a data team? Obviously not.

But it does eliminate a huge category of low-leverage requests.

What this actually means:  
Data teams aren’t becoming obsolete. They’re becoming system designers instead of report builders.

The real job is shifting to:  
• Defining clean metrics  
• Building trustworthy semantic layers  
• Setting guardrails so AI doesn’t hallucinate nonsense

If you do that well, tools like this turn marketers into power users overnight.

If you don’t… you just scaled bad data faster.

Curious how others are thinking about this: are you leaning into AI self-serve or locking things down?

---

One of my favorite naive answers from when I first started working with modern data platforms:

Someone asked me:  
“What’s your backend? AWS?”

And I replied:  
“Uh… our backend is Snowflake?”

Which felt correct at the time.  
But it turns out that answer was wrong.

Here’s the subtle thing I didn’t understand yet:  
Snowflake isn’t the backend. Snowflake is an analytics engine.

In modern data platforms there are two different layers:  
1️⃣ Storage layer: where the data physically lives.  
Examples:  
• AWS S3  
• Google Cloud Storage  
• Azure Blob Storage

2️⃣ Compute / analytics engine: the system that actually reads the data and executes queries.  
Examples:  
• Snowflake  
• BigQuery  
• Databricks

These engines sit on top of cloud storage and perform the heavy lifting.

Which means when someone asks:  
“What's your backend?”  
They’re really asking about the storage layer, not the analytics tool.

The funny part?  
Many modern tools blur this distinction so well that you don’t realize it’s happening.

I definitely didn’t.

What’s a misconception you had early in your career that later clicked?

---

Dashboards are great at automating the delivery of information.  
They’re not as good at telling the whole story.

Most dashboards can show you what happened: revenue, ROAS, conversions, cost trends. But the real question stakeholders care about is usually why something happened. And that rarely lives inside a single opinionated dashboard.

Anyone who has built dashboards long enough has seen it: two dashboards, two slightly different metric definitions, and suddenly no one trusts the numbers. Maybe they never really have.

Good data stories usually come from somewhere deeper.  
They come from a comprehensive data model. A semantic layer that accurately represents how the business actually works.

This is the "source of truth" where things like metric definitions, attribution logic, and system relationships get encoded into the data itself.

A model that is well-maintained and trustworthy allows quality, reproducible deliverables to spring from it:  
• executive reports written by analysts  
• contextual insights generated by AI tools  
• forecasting and deeper analysis  
• curated dashboards (yes, they still have their place)

The key is that the story doesn’t live in the dashboard.  
It lives in the model underneath it.

Dashboards are often disposable.  
The semantic model is the real asset.

How does your team manage metric definitions and narrative insights across dashboards, analysis, and reporting?

---

*I didn’t plan to work in tech — I stumbled into it. But along the way I learned how to take control of my career and pivot with purpose. Here’s how it happened, and how you can do it too.*

## My Journey

### College was a misguided experience.

I’m sure a lot of you can relate. I went to college because I felt it was expected of me. And because it wasn’t necessarily a deeply intentional personal decision, I was unprepared for it. It took me two extra years to get my head on straight and develop some semblance of a work ethic, but after I did, graduating was just a matter of time. In 2018 I graduated with my Bachelors in Cognitive Science, which I regularly explain as *fancy psychology*, and I didn’t really have a clear career goal. I had spent the last 6 years solely focused on getting that degree, I hadn’t spent much time deciding what job I would take.

### Then, I got lucky…but it was more than that.

Then, the summer immediately after I graduated college I got offered a job at the largest auto insurance company in the nation (it was State Farm, you can just check my [LinkedIn](https://www.linkedin.com/in/canalytics/)). I was stoked to fill the fraud investigator role because the idea of “fighting crime” felt exciting, but it’s not like it was my goal throughout college to become a fraud investigator. Which is okay\! I feel very grateful for this opportunity because it gave me a specific skill set that I was able to use to propel my career.

### Finding my own path

After handling potentially fraudulent insurance claims for 3 years, I started thinking more about what I wanted my career to look like. I had learned from my coworkers — who were mostly much older than me — that my role was highly coveted in the claim adjuster world and that I could stay in this role and be set for the rest of my career. Most of them had worked for State Farm for over 20 years\! I decided at that time that I wasn’t ready yet to be locked into any one career. First, I decided I was interested in Risk Management because it was like the umbrella field that Insurance existed in, so I took a role with an international airport as a Risk Analyst. Little did I know this switch in roles would spark my interest in the field of analytics and eventually lead me to “break into tech”\! After the Risk Analyst role I got my first real Business Intelligence Analyst role doing data analytics full time. And now I’m a Senior Business Intelligence Analyst with my sights set on continuing to grow in my Analytics career.

## Know Yourself

### Take inventory of your strengths, weaknesses, skills, and talents.

You are a unique member of the workforce. Everyone has their own unique personal and professional experience that can make them the perfect fit for a whole smattering of roles. For my first role, it may have been the fact that I had earned a psychology degree and had some military experience that made me stick out among other applicants. For my first analytics role, I leveraged my claims experience at State Farm along with the few Tableau projects I had taken the initiative in completing at my airport role.

Take inventory of your value add and tailor your story to the role or career you want. If you’re great at connecting with people, make sure you highlight those skills, they’re more important to employers than you might think. If you have a technical skill deficit for a role you’re working towards, spend time on your own upskilling (you can learn *anything* on YouTube) while also strategizing ways to explain experience gaps to prospective employers. For example, I had *zero* experience in SQL and Power BI when I interviewed for my first analytics role, but I leaned on my work experience with Tableau and talked through beginner SQL concepts I had learned the week before while studying online. There is always a way to steer the conversation away from admitting you don’t have experience or knowledge of something and towards what you *do* know.

## Plan your Career

### Are there firefighters who want to be software engineers?

Here’s my advice to people looking for a career switch or even just a new role: make a plan\! There’s no magic or shortcut to bypass real, intentional work. If there’s a new industry or role you want to break into, do your research and plan out a strategy to become an attractive applicant. Are you a firefighter who wants to become a software engineer? You’re in luck because you can learn how to code *online for free*, build a portfolio, look into internships, and learn more about software engineering as a career. That’s all it takes right?

Pause\! I want to stop you here to say there’s no golden plan or perfect roadmap to achieve any role you want. But\! It’s not impossible. 6 days out of 7 you may feel frustrated and want to quit grinding out projects, taking training, and applying to jobs, and that is ok\! You may not get your dream job right away but you will have built a skill-based foundation to set the stage for your next career move. What I want to do is empower you to feel like it’s possible to make a change. You *can* do it.

## Conclusion

As I’ve said in my other article about [Job Hopping](https://medium.com/@canalytics/career-growth-lessons-from-a-job-hopper-d1da5a012055), you don’t have to end up where you started. Your experience from your personal life, education, and career make your story and your skill set unique. Use that to your advantage when telling your story to a potential employer, whether in an interview, resume, cover letter, or even a preliminary reach out message on an online platform.

If you don’t feel like you’re where you need to be to be a competitive applicant, make a plan to become one\! Learn as much as you can online (so many free options), network and connect with people on the same journey and those who are already in the positions you’re chasing. Don’t lose hope; there are so many others there with you, working towards a better future.

### What about you?

Have you ended up in a different career than your degree prepared you for?  
What helped you overcome the challenges of switching careers?  
Share your story in the comments — let’s learn from each other.

