import React from "react";
import { Heading, HeadingLevel } from "baseui/heading";


import "../App.css";
export default function LandingPage() {
  return (
    <div className="App">
      <section style={{ margin: "4rem 2rem" }}>
        <HeadingLevel>
          <Heading style={{ fontWeight: "700" }} styleLevel={3}>
            Tree Talks
          </Heading>
        </HeadingLevel>
        <HeadingLevel>
          <Heading style={{ fontWeight: "600" }} styleLevel={6}>
            Create a room, invite your friends, and race to debug the problems
          </Heading>
        </HeadingLevel>
      </section>
      <section style={{margin:'4rem auto', display:'flex', alignItems: 'center', justifyContent:'center'}}>
        <div style={{position:'relative', width:'calc(100% - 40px)',  maxWidth:'1200px', overflow:'hidden',  boxShadow:'0 0 20px rgb(50 50 50 / 10%)'}} className="App">
        <div  style={{border: '0 solid #e2e8f0', padding:'6px 8px', boxSizing: 'border-box', borderRadius:'5px 5px 0 0', display:'block'}}>
          <div style={{border:'0 solid #e2e8f0', display:'flex'}} class="Screenshot_buttons__2eZFy">
            <div style={{width:'6px', height:'6px', margin:'0 6px 0 0', borderRadius:'10px', background:'#ed2b2b', border: '1px solid #d31212'}}></div>
            <div style={{width:'6px', height:'6px', margin:'0 6px 0 0', borderRadius:'10px', background:'#ffd144', border: '1px solid #ffd144'}}></div>
            <div style={{width:'6px', height:'6px', margin:'0 6px 0 0', borderRadius:'10px', background:'#6dd345', border: '1px solid #6dd345'}}></div>
          </div>
        </div>
        <div >
              <picture>
                  <img alt ="sponge.io" src="https://binarysearch.com/screenshot.webp" />
              </picture>
          </div>
        </div>
        

      </section>
    </div>
  );
}
