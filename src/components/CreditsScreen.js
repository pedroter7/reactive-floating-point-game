/**
 * This file is part of the Reactive Floating Point Game Project.
 * 
 * The project is licensend under the MIT Open Source License.
 * 
 * Project repository: https://github.com/pedroter7/reactive-floating-point-game
 * 
 * Author: Pedro T Freidinger
 */

 import React from "react";

 class CreditsScreen extends React.Component {
 
     constructor(props) {
        super(props);
        
        this.fontFamilies = [
            {
                name: 'Liquid Crystal',
                author: 'Chase Babb from dafont.com',
                source: 'dafont.com',
                authorWebsite: 'https://www.dafont.com/pt/profile.php?user=428160'
            },
            {
                name: 'Space Marine',
                author: 'Joiro Hatagaya',
                source: 'dafont.com',
                authorWebsite: undefined
            },
            {
                name: 'Exmouth',
                author: 'PrimaFont library',
                source: 'dafont.com',
                authorWebsite: undefined
            },
            {
                name: 'Karmatic Arcade',
                author: 'vicfieger from dafont.com',
                source: 'dafont.com',
                authorWebsite: 'https://www.dafont.com/pt/profile.php?user=16024'
            }
        ];
     }
 
     render() {

        const style = {
            width: '100%',
            height: '100%',
            margin: 0,
        };

        const buttonStyle = {
            marginTop: '1em',
            padding: '1ch'
        };


         return (
             <div id="credits-screen" style={style}>
                 <div id="credits-screen__author-div">
                    <div className="credits-screen__div-title">Author:</div>
                    <div id="credits-screen__author-name">Pedro Tersetti Freidinger</div>
                    <div id="credits-screen__author-email">pedrotersetti3@gmail.com</div>
                    <div id="credits-screen__author-website">linkedin.com/in/pedro-freidinger</div>
                 </div>
                 <div id="credits-screen__fonts-div">
                    <div className="credits-screen__div-title">Fonts:</div>
                    {
                        this.fontFamilies.map((font, i) => (
                            <div className="credits-screen__font-box" key={i}>
                                <div className="credits-screen__font-box__font-credits">
                                    Font name: {font.name}; Author: {font.author}; Source: {font.source} {font.authorWebsite ? `; Author website: ${font.authorWebsite}` : '' }
                                </div>
                            </div>
                        ))
                    }
                 </div>
                 <button className="game-button" style={buttonStyle} id="game-button__credits-screen__go-back" onClick={this.props.onBack}>Back</button>
             </div>
         );
     }
 
 }
 
 export default CreditsScreen;