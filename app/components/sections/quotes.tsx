import Grid from '~/components/ui/grid'
import Quote from '~/components/ui/quotes/quote'

const Quotes = () => (
  <Grid>
      <Quote hero id="margaret" name="Margaret Francis" role="Former GM" company="Heroku" url='https://www.heroku.com/'>
        “<strong>Charlie is so gifted and productive.</strong> I would work with him again any day. It's been a great professional and personal pleasure to spend these last few years travelling in his company, and seeing the great beauty he's brought to the world through his work on Heroku. May we have the chance to do good things together again&nbsp;someday!”
      </Quote>

      <Quote id="john" name="John Barton" role="CTO" company="Amber Electric" url='https://www.amberelectric.com.au/'>
        “Charlie’s nicer friends will say great things about his creativity and empathy, which is true, but not interesting. Charlie has hustle. He works and he works and he works, <strong>and that is how he got so good at what he&nbsp;does</strong>.”
      </Quote>

      <Quote id="glen" name="Glen Maddern" role="Co-founder" company="Linc" url='https://linc.sh/'>
        “<strong>Charlie has a formidable blend of talents</strong>: a grounded, empathetic design sense, an artist’s eye for subversion, and the tenacity to do whatever—and learn whatever—is necessary to ship&nbsp;projects.”
      </Quote>

      <Quote id="will" name="Will Dayble" role="Co-founder" company="Squareweave" url='https://www.squareweave.com.au/'>
        “Charlie has a <strong>unique, articulate, polished understanding of design</strong>, art and how people interact and care for one&nbsp;another.”
      </Quote>

      <Quote id="bex" name="Becky Bolton" role="Former Developer" company="Unbound" url='https://unbound.com/'>
        “<strong>Charlie is a developer of exceptional talent</strong>. He is personable and fun, and these qualities made him universally loved by the team around&nbsp;him.”
      </Quote>
  </Grid>
)

export default Quotes
