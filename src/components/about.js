import React from 'react'


const About = () => {
    return (
        <div className="about">
            <h1 id='team-h1'>The Melqui Team by <a target="_blank" rel="noopener noreferrer" href='https://lambdaschool.com/'>Lambda</a></h1>
        <section class='team'>
            <div class='team-members'>
                <img src='https://avatars1.githubusercontent.com/u/9201063?s=400&u=41a19d4661b8efa7fb5e03ae2c0005f2d121bee3&v=4' alt="user" width='200px' />
                <div className="member-desc">
                <p>Melquisedeque Pereira<br />
                Team Lead</p>
                <a target="_blank" rel="noopener noreferrer" href='https://github.com/melquip'><p>GitHub</p></a>
                </div>
            </div>
            <div class='team-members'>
                <img src='https://ca.slack-edge.com/ESZCHB482-W012JPY7CV9-e913dddb3135-512' alt="user" width="200px" />
                <div className="member-desc">
                <p>Matthew Locklin<br />
                Front End</p>
                <a target="_blank" rel="noopener noreferrer" href='https://github.com/lockers'><p>GitHub</p></a>
                </div>
            </div>
            <div class='team-members'>
                    <img src='https://ca.slack-edge.com/ESZCHB482-W012QNU6C4U-553c7d4b105b-512' alt="user" width='200px' />
                <div className="member-desc">
                <p>Darragh Ferry<br />
                Back End</p>
                <a target="_blank" rel="noopener noreferrer" href='https://github.com/primelos'><p>GitHub</p></a>
                </div>
            </div>
            <div class='team-members'>
                <img src='https://avatars0.githubusercontent.com/u/48069565?s=460&u=36f3a40c2b9a0c037ad1575d03ee1a607961b0e1&v=4' alt="user" width='200px' />
                <div className="member-desc">
                <p>Niklas Becker<br />
                Front End</p>
                <a target="_blank" rel="noopener noreferrer" href='https://github.com/durotolu'><p>GitHub</p></a>
                </div>
            </div>
            <div class='team-members'>
                <img src='https://avatars1.githubusercontent.com/u/49835145?s=460&u=92c5ebbbbaaf3695bc438506947f171cafe5865a&v=4' alt="user" width='200px' />
                <div className="member-desc">
                <p>Karim Bertacche<br />
                Back End</p>
                <a target="_blank" rel="noopener noreferrer" href='https://github.com/KarimBertacche'><p>GitHub</p></a>
                </div>
            </div>
        </section>
        </div>
    )
}

export default About