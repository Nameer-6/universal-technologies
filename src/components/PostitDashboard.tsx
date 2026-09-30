// Static, decorative mock of the postit.ai dashboard (no real data).
const NAV = ['Dashboard', 'Discover', 'Create', 'Calendar', 'Analytics', 'Ads', 'Brand', 'Settings']

const TRENDS = [
  ['Al in the workplace', '+320%'],
  ['Sustainable business', '+210%'],
  ['Creator economy', '+180%'],
  ['Marketing automation', '+140%'],
] as const

const IDEAS = [
  ['5 ways Al is changing marketing in 2024', 'Blog', 'LinkedIn', 'g1'],
  ['A behind-the-scenes look at our process', 'Carousel', 'Instagram', 'g2'],
  ['Why consistent posting drives growth', 'Thread', 'X (Twitter)', 'g3'],
] as const

const DAYS = [
  ['Mon', 'Apr 21', 'in', 'The future of work is human', '9:00 AM', 'g1'],
  ['Tue', 'Apr 22', 'X', '5 marketing trends to watch', '11:00 AM', 'g2'],
  ['Wed', 'Apr 23', 'ig', 'Behind the scenes at our team', '10:00 AM', 'g3'],
  ['Thu', 'Apr 24', 'f', 'How automation saves time', '8:00 AM', 'g4'],
  ['Fri', 'Apr 25', 'in', 'A smarter way to grow', '11:00 AM', 'g5'],
  ['Sat', 'Apr 26', 'ig', 'Tips for better content', '10:00 AM', 'g6'],
  ['Sun', 'Apr 27', 'X', 'Thread: Al tools we love', '11:00 AM', 'g7'],
] as const

const STATS = [
  ['1.2M', 'Impressions', '210%'],
  ['48.7K', 'Engagements', '90%'],
  ['2.4K', 'Link clicks', '140%'],
  ['420', 'New followers', '72%'],
] as const

export function PostitDashboard() {
  return (
    <div className="pd-window" aria-hidden="true">
      <div className="pd-dots">
        <i style={{ background: '#ff5f57' }} />
        <i style={{ background: '#febc2e' }} />
        <i style={{ background: '#28c840' }} />
      </div>

      <div className="pd-layout">
        <aside className="pd-side">
          <b className="pd-logo">postit.ai</b>
          {NAV.map((label, index) => (
            <span key={label} className={index === 0 ? 'is-on' : undefined}>
              <i />
              {label}
            </span>
          ))}
        </aside>

        <div className="pd-main">
          <div className="pd-top">
            <span className="pd-search">Search trends, topics or create a post...</span>
            <span className="pd-create">+ Create Post</span>
            <span className="pd-user">
              <i /> Sarah
            </span>
          </div>

          <div className="pd-row pd-row--two">
            <div className="pd-card">
              <h4>
                Trending Topics <em>See more</em>
              </h4>
              {TRENDS.map(([name, pct], index) => (
                <p key={name} className="pd-trend">
                  <span>{index + 1}</span>
                  {name}
                  <svg viewBox="0 0 48 14" aria-hidden="true">
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((bar) => (
                      <rect key={bar} x={bar * 5} y={13 - 2 - bar} width="3" height={2 + bar} />
                    ))}
                  </svg>
                  <strong>{pct}</strong>
                </p>
              ))}
            </div>

            <div className="pd-card">
              <h4>
                Content Ideas <em>See more</em>
              </h4>
              {IDEAS.map(([title, tagA, tagB, tone]) => (
                <p key={title} className="pd-idea">
                  <i className={`pd-img ${tone}`} />
                  <span>
                    {title}
                    <small>
                      <u>{tagA}</u>
                      <u>{tagB}</u>
                    </small>
                  </span>
                </p>
              ))}
            </div>
          </div>

          <div className="pd-card">
            <h4>
              Weekly Content Calendar <em>View all</em>
            </h4>
            <div className="pd-cal">
              {DAYS.map(([day, date, net, text, time, tone]) => (
                <div key={day + date}>
                  <small>
                    {day}
                    <br />
                    {date}
                  </small>
                  <i className={`pd-img ${tone}`}>
                    <b>{net}</b>
                  </i>
                  <span>{text}</span>
                  <small>{time}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="pd-row pd-row--two pd-row--foot">
            <div className="pd-card">
              <h4>
                Performance Overview <em>Last 30 days</em>
              </h4>
              <div className="pd-stats">
                {STATS.map(([value, label, delta]) => (
                  <div key={label}>
                    <strong>{value}</strong>
                    <small>{label}</small>
                    <em>↑ {delta}</em>
                  </div>
                ))}
              </div>
            </div>
            <div className="pd-card">
              <h4>
                Generated Visuals <em>See more</em>
              </h4>
              <div className="pd-vis">
                <i className="pd-img g8" />
                <i className="pd-img g2" />
                <i className="pd-img g5" />
                <i className="pd-img g6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
