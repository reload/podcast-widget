import { render, h } from "preact";
import { useState, useEffect } from "preact/hooks";
import Parser from "rss-parser";

export default function App({ url }) {
  const [feed, setFeed] = useState(null);
  useEffect(() => {
    const parser = new Parser();
    parser.parseURL(url).then(setFeed);
  }, [url]);
  return (
    <section ariaLive="polite" ariaBusy={!feed} className="podcast-widget">
      {!feed ? (
        <p>Henter lydavis</p>
      ) : (
        <ul>
          {feed.items.map((item) => {
            const mp3Link = `${item.link}.mp3`;
            return (
              <li key={item.guid}>
                <figure>
                  <figcaption>{item.title}</figcaption>
                  <audio controls>
                    <source src={mp3Link} type="audio/mp3"></source>
                    <p>
                      Din browser supportere ikke <code>audio</code> elementet.
                      Her er et <a href={mp3Link}>download link</a> istedet.
                    </p>
                  </audio>
                </figure>
                <a href={mp3Link}>Hent</a>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

const roots = document.querySelectorAll("[data-podcast-widget]");
[...roots].forEach((root) => {
  render(<App {...root.dataset} />, root);
});
