json.array! @new_message do |message|
  json.text  message.content
  json.user_name  message.user.name
  json.timestamp  message.created_at
  json.image  message.image
  json.id message.id
end
