exports.handler = function(event, context) {
    //Echo back the text the user typed in
    // const SLACK_VERIFICATION_TOKEN = process.env.SLACK_VERIFICATION_TOKEN;
    // const SLACK_VERIFICATION_TOKEN = 'zl5KxdwjKNZgw2qLFm7U7NCM';
    // const querystring = require('querystring');

    // const payload = querystring.parse(event.body);
    // if (payload.token !== SLACK_VERIFICATION_TOKEN) {
        // Invalid Slack verification token on payload
    //     throw 'Invalid verification token';
    // }

   var data = [
    {
        key: ["newrelic"],
        data:[
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/68616270/New+Relic+integration+for+monitoring",
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/68616300/Creating+New+Relic+Alerts+and+Dashboards"
        ] 
    },
    {
        key: ["sumo"],
        data:[
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/62292986/Sumo+Logic+integration+for+monitoring",
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/68649052/Creating+Sumo+Logic+Alerts+and+Dashboards"
        ] 
    },
    {
        key: ["kafka"],
        data:[
            "https://apglobal.atlassian.net/wiki/spaces/PAYL/pages/21401956/10+Quickstart+Guide"
        ] 
    },
    {
        key: ["whitelist","dns","cloudflare"],
        data:[
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/68583493/DNS+Changes",
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/62424152/Whitelisting+IP+Addresses",
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/68517990/Access+to+Cloudflare",
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/116621387/Cloudflare+Administration+Dashboard+Access+Rules"
        ] 
    },
     {
        key: ["metric","quality"],
        data:[
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/116621387/Cloudflare+Administration+Dashboard+Access+Rules",
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/140312620/Post-Monolith+Software+Quality"
        ] 
    },
    {
        key: ["kubernetes", "k8s"],
        data:[
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/97845253/Kubernetes+Decision+Register",
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/146867018/Engineering+Access+k8s+Cluster"
        ] 
    },
    {
        key: ["cadence"],
        data:[
            "https://apglobal.atlassian.net/wiki/spaces/PE/pages/146833516/Cadence"
        ] 
    },
    {
        key: ["access"],
        data:[
            "Please contact #global-itsupport for all related access queries."
        ] 
    }
]

if(event.text === 'list'){
    var helpText = "Please select your topic: `/faq` "
    var topics = [];
     data.forEach(element => {
        topics = topics.concat(element.key);
    })
    helpText += topics.join(' | ');
    helpText = helpText.trim(' ').trim('|');
    context.succeed(helpText);
}



var result = '';
var prefix = '';

if(event.text != 'access'){
    prefix = 'These documents could be helpful: ';
    
}


data.forEach(element => {
    var delimiter = ', ';
    var updated = false;
    if(element.key.some((keyword) => event.text.toLowerCase().includes(keyword.toLowerCase()))){
        result = result + element.data.join(delimiter);
        updated = true;
    }
    if(updated){
        result = result + delimiter;
    }
});


if(result == '')
{
    context.succeed("No current document related to it, feel free to ask the team!");
}
result = result.trim(' ').trim(',');

var lastChar = result.slice(-1);
if (lastChar == ',') {
    result = result.slice(0, -1);
}

context.succeed(prefix + result);
};