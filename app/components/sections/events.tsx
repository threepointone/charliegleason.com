import Block from '~/components/ui/events/block'
import Items from '~/components/ui/events/items'
import Item from '~/components/ui/events/item'
import Education from '~/components/ui/events/education'
import Grid from '~/components/ui/grid'

const Events = () => (
  <>
    {/* prettier-ignore */}
    <Grid>
      <Block id="awards-achievements" title="Awards &amp; Achievements">
        <Items>
          <Item date="2021" title="Product Hunt, Featured" link={{title: "Pika", href: "https://www.producthunt.com/posts/pika"}} />
          <Item date="2019" title="The Ink Award" link={{title: "Heroku Hanafuda Cards", href: "https://suminagame.com/2019/11/27/choboku-037/"}} />
          <Item date="2017" title="Typewolf, Site of the Day" link={{title: "Charlie Gleason", href: "https://www.typewolf.com/site-of-the-day/charlie-gleason"}} />
          <Item date="2016" title="The FWA, Site of the Day" link={{title: "Kōya", href: "https://thefwa.com/cases/koya"}} />
          <Item date="2016" title="AWWWARDS, Honourable Mention" link={{title: "Kōya", href: "https://www.awwwards.com/sites/koya"}} />
          <Item date="2016" title="The FWA, Site of the Day" link={{title: "Rugby", href: "https://thefwa.com/cases/rugby"}} />
          <Item date="2016" title="AWWWARDS, Honourable Mention" link={{title: "Rugby", href: "https://www.awwwards.com/sites/rugby"}} />
          <Item date="2015" title="The FWA, Site of the Day" link={{title: "I Will Never Let You Go", href: "https://thefwa.com/cases/i-will-never-let-you-go"}} />
          <Item date="2015" title="AWWWARDS, Honourable Mention" link={{title: "I Will Never Let You Go", href: "https://www.awwwards.com/sites/i-will-never-let-you-go"}} />
          <Item date="2015" title="Chrome Experiments" link={{title: "Tweetflight", href: "https://experiments.withgoogle.com/tweetflight"}} />
          <Item date="2014" title="Futurebook Innovation Awards, Best Publisher Website, Unbound" />
          <Item date="2013" title="Google Sandbox, Tweetflight" />
          <Item date="2013" title="The FWA, Site of the Day" link={{title: "Tweetflight", href: "https://thefwa.com/cases/tweetflight"}} />
          <Item date="2013" title="AWWWARDS, Site of the Day" link={{title: "Tweetflight", href: "https://www.awwwards.com/sites/tweetflight"}} />
          <Item date="2011" title="AWWWARDS, Site of the Day" link={{title: "The Story of Mick Roberts", href: "https://www.awwwards.com/sites/smoking-takes-lives"}} />
          <Item date="2011" title="Caples, Silver, Pop What You’re Not" />
          <Item date="2011" title="Award, Bronze, Pop What You’re Not" />
          <Item date="2010" title="AIMIA, Nomination for Effectiveness, Pop What You’re Not" />
          <Item date="2010" title="ADMA, Bronze for Art Direction / Craft, Pop What You’re Not" />
          <Item date="2010" title="ADMA, Silver for Automotive, Pop What You’re Not" />
          <Item date="2010" title="MADC, Bronze for Best Microsite, Pop What You’re Not" />
          <Item date="2007" title="Design Institute of Australia, Encouragement Award" />
        </Items>
      </Block>

      <div className="space-y-8">
        <Block id="talks-demos-workshops" title="Talks, Demos &amp; Workshops">
          <Items>
            <Item date="2019" title="Creative Coding London" />
            <Item date="2017" title="Master of Ceremonies: JSConf Budapest" />
            <Item date="2016" title="Decompress: Blending WebGL and video" />
            <Item date="2012" title="Web Directions South: You are a developer, the internet is your friend" />
            <Item date="2012" title="What Do You Know: So, you are great (and so is Less CSS)" />
            <Item date="2011" title="What Do You Know: How to make your life more awesome with CSS3 media queries" />
          </Items>
        </Block>

          <Block id="education" title="Education">
            <Education title="Masters of Computer Science" school="RMIT University" location="Melbourne" dates="2011 - incomplete" />
            <Education title="Bachelor of Design (Multimedia Design)" school="Swinburne School of Design" location="Melbourne" dates="2004 - 2007" postscript="First Class Honours" />
          </Block>

          <Block id="volunteering" title="Volunteering">
            <Items>
              <Item title="Samaritans" />
            </Items>
          </Block>

          <Block id="triathlons" title="Triathlons">
            <Items>
              <Item date="2022" title="Blenheim Palace Triathlon (Sprint)" />
            </Items>
          </Block>
            
          <Block id="half-marathons" title="Half Marathons">
            <Items>
              <Item date="2022" title="Manchester Great Run" />
              <Item date="2021" title="London Landmarks" />
            </Items>
          </Block>
            
          <Block id="marathons" title="Marathons">
            <Items>
              <Item date="2017" title="London" />
              <Item date="2015" title="London" />
            </Items>
          </Block>

          <Block id="ultra-marathons" title="Ultra Marathons"> 
            <Items>
              <Item title="None" />
            </Items>
          </Block>    
      </div>
    </Grid>
  </>
)

export default Events
