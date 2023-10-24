const createTeamResultView = (teamName) => {
    const maxPlayers = 12;
    const maxScore = 160;
    $("#main").append(`
        <div class="teamResult ${teamName}">
            <br>
            <div class="team ${teamName}"></div>
            <div class="resultTable ${teamName}"></div>
        </div>
    `);

    $(`.team.${teamName}`).append(`
        <div class="name">
            <input type="text" class="teamName ${teamName}" placeholder="Naziv tima">
            <br>
            <input type="text" class="teamLocation ${teamName}" placeholder="Lokacija (primer: Nisa)">
        </div>
    `);

    $(`.team.${teamName}`).append(`<br>`);

    $(`.team.${teamName}`).append(`<div class="coach"><input type="text" class="teamCoach ${teamName}" placeholder="Trener"></div>`);
    $(`.team.${teamName}`).append(`<div class="representative"><input type="text" class="teamRepresentative ${teamName}" placeholder="Sluzbeni predstavnik"></div>`);

    $(`.team.${teamName}`).append(`<br>`);

    for (let i = 0; i < maxPlayers; i++) {
        $(`.team.${teamName}`).append(`
            <div class="player ${teamName}">
                <input type="number" class="playerNumber ${teamName}" placeholder="Broj">
                <input type="text" class="playerName ${teamName}" placeholder="Naziv igraca">
            </div>  
        `);
    }

    $(`.team.${teamName}`).append(`<br>`);
    
    for (let i = 1; i < maxScore + 1; i++) {
        $(`.resultTable.${teamName}`).append(`
            <div class="score"><input type="number" class="playerScore ${teamName}" name="${i}"><div class="numberView"><span>${i}</span></div></div>
        `);
    }
}

const getPlayers = (teamName) => {
    let players = [];

    $(`.player.${teamName}`).each((i, e) => {
        player = { 
            number: $(e).children(".playerNumber").val(),
            name: $(e).children(".playerName").val(),
            score: 0
        }
        players[player.number] = player;
    })
    delete players[""];
    return players;
}

const getResults = (teamName) => {
    let results = []

    $(`.playerScore.${teamName}`).each((i,e) => {
        value = $(e).val();
        if(value) {
            results.push({
                playerNumber: value,
                teamScore: $(e).attr("name")
            })
        }
    })
    return results;
}

const calculateResult = (teamName) => {
    players = getPlayers(teamName);
    results = getResults(teamName);
    currentTeamScore = 0;

    for (let i = 0; i < results.length; i++) {
        points = results[i].teamScore - currentTeamScore;
        players[results[i].playerNumber].score += points;
        currentTeamScore = results[i].teamScore;
    }

    return players;
}

const main = () => {
    createTeamResultView("a");
    createTeamResultView("b");
}

$("#createDocx").click(() => {
    const _logoImg = `image/jpeg;base64,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`
    
    const _columSizeTitleImage = [2000, 7010]
    const _columnSizesGameScore = [2000, 600, 1800, 2000]
    const _columnSizesNameLoc = [1150, 2550, 700, 2700]
    const _columnSizesTeam = [1150, 3250, 3100, 1510]
    const _columnSizesCoachRep = [3750, 3750, 1510]
    const _columnSizesDelegat = [6000, 2200, 810]

    const _borderNone = (underline = true) => { return {
        top: {style: docx.BorderStyle.NONE, size: 0, color: "FFFFFF"},
        bottom: (underline)?{style: docx.BorderStyle.NONE, size: 0, color: "FFFFFF"}:{},
        left: {style: docx.BorderStyle.NONE, size: 0, color: "FFFFFF"},
        right: {style: docx.BorderStyle.NONE, size: 0, color: "FFFFFF"},
    }}

    const createTitleImageTable = () => {
        let table = new docx.Table({
            columnWidths: _columSizeTitleImage,
            rows: [ new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: _columSizeTitleImage[0],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph({ 
                            children: [new docx.ImageRun({
                                data: _logoImg,
                                transformation: {
                                    width: 108,
                                    height: 110,
                                }
                            })],
                        })],
                        borders: _borderNone()
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columSizeTitleImage[1],
                            type: docx.WidthType.DXA,
                        },
                        children: [ 
                            new docx.Paragraph(""),
                            new docx.Paragraph({ 
                                children: [new docx.TextRun({text: "РЕГИОНАЛНИ КOШAРKAШKИ САВЕЗ ИСТОЧНА СРБИЈА", bold: true, font: "Arial", size: 36})],
                                alignment: docx.AlignmentType.CENTER
                            }),
                            new docx.Paragraph(""),
                            new docx.Paragraph({ 
                                children: [new docx.TextRun({text: "ОБРАЗАЦ ДАТИХ КОШЕВА", bold: false, font: "Arial", size: 32})],
                                alignment: docx.AlignmentType.CENTER
                            }),
                        ],
                        borders: _borderNone()
                    })
                ]
            })
        ]
    })

    return table;
    }

    const createNameLocTable = (name, loc) => {
        let table = new docx.Table({
            columnWidths: _columnSizesNameLoc,
            rows: [ new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: _columnSizesNameLoc[0],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph({ 
                            children: [new docx.TextRun({text: "КК", bold: true, font: "Calibri"})],
                            alignment: docx.AlignmentType.CENTER
                        })],
                        borders: _borderNone()
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columnSizesNameLoc[1],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph(",," + name + "''")],
                        borders: _borderNone(false)
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columnSizesNameLoc[2],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph({ 
                            children: [new docx.TextRun({text: "из  ", bold: true, font: "Calibri"})],
                            alignment: docx.AlignmentType.RIGHT
                        })],
                        borders: _borderNone()
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columnSizesNameLoc[3],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph(loc)],
                        borders: _borderNone(false)
                    })
                ]
            })
        ]
    })

    return table;
    }
    const createGameScoreTable = (number, gameScore) => {
        let table = new docx.Table({
            columnWidths: _columnSizesGameScore,
            rows: [ new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: _columnSizesGameScore[0],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph({ 
                            children: [new docx.TextRun({text: "БРОЈ УТАКМИЦЕ: ", bold: true, font: "Calibri"})],
                            alignment: docx.AlignmentType.RIGHT

                        })],
                        borders: _borderNone()
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columnSizesGameScore[1],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph(number.toString())],
                        borders: _borderNone()
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columnSizesGameScore[2],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph({ 
                            children: [new docx.TextRun({text: "РЕЗУЛТАТ:  ", bold: true, font: "Calibri"})],
                            alignment: docx.AlignmentType.RIGHT
                        })],                        
                        borders: _borderNone()
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columnSizesGameScore[3],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph(" " + gameScore)],
                        borders: _borderNone()
                    })
                ]
            })
        ]
    })

    return table;
    }
    const createTeamTable = (teamData) => {
        while (teamData.length != 12) teamData.push(createTeamTableRow("", "", ""))

        teamData.unshift(createTeamTableRow("Бр.играча", "ПРЕЗИМЕ и ИМЕ", "Дати кошеви", "ТГ/ДГ", true));

        let table = new docx.Table({
            columnWidths: _columnSizesTeam,
            rows: teamData
        });

        return table;
    }
    const createCoachRepTable = (coach, rep) => {
        [" Тренер", " Службени представник"].map(title => {
            console.log(title);
            console.log((title == " Тренер")?"OvoJeTrener":"OvoJeSluzbenik")
        });
        let table = new docx.Table({
            columnWidths: _columnSizesCoachRep,
            rows: [" Тренер", " Службени представник"].map(title => new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: _columnSizesCoachRep[0],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph({ 
                            children: [new docx.TextRun({text: title, bold: true, font: "Calibri"})],
                        })],  
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columnSizesCoachRep[1],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph(" " + ((title == " Тренер")?coach:rep))]
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columnSizesCoachRep[2],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph("")],
                    })
                ]
            }))
        });

        return table;
    }
    const createTeamTableRow = (number, name, score, tg_td = "", boldFlag = false) => {
        return new docx.TableRow({
            children: [
                new docx.TableCell({
                    width: {
                        size: _columnSizesTeam[0],
                        type: docx.WidthType.DXA,
                    },
                    children: [ new docx.Paragraph({ 
                        children: [new docx.TextRun({text: number, bold: boldFlag, font: (boldFlag)?"Calibri":"Times New Roman"})],
                        alignment: docx.AlignmentType.CENTER
                    })],
                    verticalAlign: docx.VerticalAlign.CENTER
                }),
                new docx.TableCell({
                    width: {
                        size: _columnSizesTeam[1],
                        type: docx.WidthType.DXA,
                    },
                    children: [ new docx.Paragraph({ 
                        children: [new docx.TextRun({text: name, bold: boldFlag, font: (boldFlag)?"Calibri":"Times New Roman"})],
                        alignment: docx.AlignmentType.CENTER
                    })],
                    verticalAlign: docx.VerticalAlign.CENTER
                }),
                new docx.TableCell({
                    width: {
                        size: _columnSizesTeam[2],
                        type: docx.WidthType.DXA,
                    },
                    children: [ new docx.Paragraph({ 
                        children: [new docx.TextRun({text: score.toString(), bold: boldFlag, font: (boldFlag)?"Calibri":"Times New Roman"})],
                        alignment: docx.AlignmentType.CENTER
                    })],
                    verticalAlign: docx.VerticalAlign.CENTER
                }),
                new docx.TableCell({
                    width: {
                        size: _columnSizesTeam[3],
                        type: docx.WidthType.DXA,
                    },
                    children: [ new docx.Paragraph({ 
                        children: [new docx.TextRun({text: tg_td, bold: boldFlag, font: (boldFlag)?"Calibri":"Times New Roman"})],
                        alignment: docx.AlignmentType.CENTER
                    })],
                    verticalAlign: docx.VerticalAlign.CENTER
                })
            ]
        })
    }
    const createDelegateTable = () => {
        let table = new docx.Table({
            columnWidths: _columnSizesDelegat,
            rows: ["ДЕЛЕГАТ", ""].map(title => new docx.TableRow({
                children: [
                    new docx.TableCell({
                        width: {
                            size: _columnSizesDelegat[0],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph("")],
                        borders: _borderNone()
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columnSizesDelegat[1],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph({ 
                            children: [new docx.TextRun({text: title, bold: true, font: "Calibri"})],
                            alignment: docx.AlignmentType.CENTER
                        })],
                        borders: (title.length)?_borderNone():_borderNone(false)
                    }),
                    new docx.TableCell({
                        width: {
                            size: _columnSizesDelegat[2],
                            type: docx.WidthType.DXA,
                        },
                        children: [ new docx.Paragraph("")],
                        borders: _borderNone()
                    })
                ]
            }))    
        })
        return table;
    }


    const gameNumber = $("#gameNumber").val();

    const teamAcal = calculateResult("a").filter(obj => obj);

    const teamNameA = $(".teamName.a").val();
    const teamLocationA = $(".teamLocation.a").val();
    const teamCoachA = $(".teamCoach.a").val();
    const teamRepresentativeA = $(".teamRepresentative.a").val();
    const teamA = teamAcal.map(obj => createTeamTableRow(obj.number, obj.name, obj.score));
    const teamPointsA = teamAcal.reduce((sum, obj) => sum + obj.score, 0);

    const teamBcal = calculateResult("b").filter(obj => obj);

    const teamNameB = $(".teamName.b").val();
    const teamLocationB = $(".teamLocation.b").val();    
    const teamCoachB = $(".teamCoach.b").val();
    const teamRepresentativeB = $(".teamRepresentative.b").val();
    const teamB = teamBcal.map(obj => createTeamTableRow(obj.number, obj.name, obj.score));   
    const teamPointsB = teamBcal.reduce((sum, obj) => sum + obj.score, 0);    

    let breakParagraph = new docx.Paragraph({
        text: "",
        spacing: {
            line: 0,
        }
    })
    const doc = new docx.Document({
        properties: {},
        styles: {
            paragraphStyles: [{
                name: "Normal",
                run: {
                    size: 24
                }
            }]
        },
        sections: [{
            children: [ 
                createTitleImageTable(),
                new docx.Paragraph(""),
                createGameScoreTable(gameNumber, teamPointsA+":"+teamPointsB),
                breakParagraph,
                createNameLocTable(teamNameA, teamLocationA),
                new docx.Paragraph(""),
                createTeamTable(teamA),
                createCoachRepTable(teamCoachA, teamRepresentativeA),  
                breakParagraph, 
                createNameLocTable(teamNameB, teamLocationB),
                new docx.Paragraph(""),
                createTeamTable(teamB),
                createCoachRepTable(teamCoachB, teamRepresentativeB),
                new docx.Paragraph(""),
                createDelegateTable()
            ]
        }] 
    });

    docx.Packer.toBlob(doc).then((blob) => {
        console.log(blob);
        saveAs(blob, `Образац датих кошева КК ${teamNameA} - КК ${teamNameB}.docx`);
        console.log("Document created successfully");
    });
})

main();

