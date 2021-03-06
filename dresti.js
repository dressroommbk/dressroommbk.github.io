var req = null;
var separated = true;
var channelDate = null;

var channelUri = '/dressroom/channels.php?';

if (window.location.href.indexOf('.ru/') > 0)
{
	channelUri = 'channels.php?';
}

function loadXMLDoc(url) 
{
	try
	{
		try 
		{
			req = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e) 
		{
			try 
			{
				req = new ActiveXObject("Microsoft.XMLHTTP");
			}
			catch (e) 
			{
				req = false;
			}
		}
		if (!req && typeof XMLHttpRequest != 'undefined')
		{
			req = new XMLHttpRequest();
		}
		if (req)
		{
			req.open("GET", url, false);
			req.send(null);
		} 
		else 
		{
			alert("Kill yourself or change the browser...");
			return false;
		}
	}
	catch (e)
	{
		alert("Request error:\n" + e.message);
		return false;
	}
	return true;
}


function onSeparation()
{
	var l = document.getElementById('left');
	var r = document.getElementById('right');
	if (separated)
	{
		l.style.display = 'none';
		r.style.width = '100%';
	}
	else
	{
		r.style.width = '81%';
		l.style.display = '';
	}
	separated = !separated;
}

function getPanelChannelsHtml()
{
	var html = '';
	html += '<center><input class="inpButton" type="button" value="Скрыть" onclick="onSeparation()" /></center>';
	html += '<div id="channels">Идёт чтение каналов...</div>';
	return html;
}

function placePanelChannels()
{
	document.write(getPanelChannelsHtml());
}

function updatePanelChannels()
{
	var html = '';
	if (loadXMLDoc(channelUri + 'channel=news&channel=links&channel=consulting'))
	{
		html = req.responseText;
	}
	document.getElementById('channels').innerHTML = html;
}
