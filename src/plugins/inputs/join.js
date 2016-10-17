var Chan = require("../../models/chan");
var Chan = require("../../models/chan");
var Msg = require("../../models/msg");
var User = require("../../models/user");

exports.commands = ["join"];

exports.input = function(network, chan, cmd, args) {
	var client = this;
	console.log('join '+args.join(":-"));
	var irc = network.irc;
	var target = chan;

	//if (args.length === 0 || !target) {
	//	return true;
	//};

	//var msg = args.join(" ");
	//console.log('join '+msg);

	//if (msg.length === 0) {
	//	return true;
	//};
	
	data = {}

	if (args.length == 2) {
		var irc = network.irc;
		irc.raw("JOIN", args[0], args[1]);
		data.channel = args[0];
		data.key = args[1];
	}
	if (args.length == 1) {
		var irc = network.irc;
		irc.raw("JOIN", args[0]);
		data.channel = args[0];
		data.key = "";
	}
	var chan = network.getChannel(data.channel);
	if (typeof chan === "undefined") {
		chan = new Chan({
			name: data.channel,
			key: data.key
		});
		network.channels.push(chan);
		client.save();
		client.emit("join", {
			network: network.id,
			chan: chan
		});
	}
	//chan = new Chan({
	//	name: data.channel,
	//	key: data.key
	//});
	//network.channels.push(chan);
	//client.save();
	//client.emit("join", {
	//	network: network.id,
	//	chan: chan
	//});
	//irc.join(chan, msg);

	//if (!network.irc.network.cap.isEnabled("echo-message")) {
		//var channel = network.getChannel(target);
		//if (typeof channel !== "undefined") {
			//irc.emit("join", {
			//	nick: irc.user.nick,
			//	target: channel.name,
			//	message: msg
			//});
		//};
	//};

	return true;
};
