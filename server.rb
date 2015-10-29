require 'webrick'
require 'json'

port = ENV['PORT'].nil? ? 3000 : ENV['PORT'].to_i

puts "Server started: http://localhost:#{port}/"

root = File.expand_path './public'
server = WEBrick::HTTPServer.new Port: port, DocumentRoot: root

server.mount_proc '/integrations' do |req, res|
  integrations = JSON.parse(File
    .read('./mocks/integrations.json', encoding: 'UTF-8'))

  # always return json
  res['Content-Type'] = 'application/json'
  res['Cache-Control'] = 'no-cache'
  res.body = JSON.generate(integrations)
end

server.mount_proc '/integrations/calendar' do |req, res|
  integration_infos = JSON.parse(File
    .read('./mocks/calendar_integrations.json', encoding: 'UTF-8'))

  if req.request_method == 'POST'
    # Assume it's well formed
    integration_info = {}
    req.query.each do |key, value|
      integration_info[key] = value.force_encoding('UTF-8')
    end
    integration_infos << integration_info
    File.write(
      './calendar_integrations.json',
      JSON.pretty_generate(integration_infos, indent: '    '),
      encoding: 'UTF-8'
    )
  end

  res['Content-Type'] = 'application/json'
  res['Cache-Control'] = 'no-cache'
  res.body = JSON.generate(integration_infos)
end

trap('INT') { server.shutdown }

server.start
