--{{ SERVICES }}--
local Players = game:GetService("Players")

local values = script.Parent.Values
local hitbox = script.Parent.Hitbox

local hillPlayers = {}

local function updateHillStatus()
	if #hillPlayers == 1 then
		local player = hillPlayers[1]

		-- Checks if the player is alive before awarding time
		if player.Character and player.Character:FindFirstChild("Humanoid") and player.Character.Humanoid.Health > 0 then
			values.King.Value = true
			values.IsContested.Value = false

			-- Increases the player's time if on the object
			local leaderstats = player:FindFirstChild("leaderstats")
			if leaderstats then
				local timeValue = leaderstats:FindFirstChild("Time")
				if timeValue and timeValue:IsA("IntValue") then
					timeValue.Value = timeValue.Value + 50
				else
					warn("Time is not a valid IntValue in leaderstats for player: " .. player.Name)
				end
			else
				warn("leaderstats not found for player: " .. player.Name)
			end
		else
			-- Remove the player from the hillPlayers list if they are dead
			table.remove(hillPlayers, 1)  
			-- Reset values if no players are on the hill
			if #hillPlayers == 0 then
				values.King.Value = false
				values.IsContested.Value = false
			end
		end
	else
		values.King.Value = false
		values.IsContested.Value = #hillPlayers > 0 
	end
end

hitbox.Touched:Connect(function(hit)
	local humanoid = hit.Parent:FindFirstChild("Humanoid")
	if humanoid then
		local player = Players:GetPlayerFromCharacter(hit.Parent)
		if player and not table.find(hillPlayers, player) then
			table.insert(hillPlayers, player)
			if #hillPlayers == 1 then
				values.King.Value = true
				values.IsContested.Value = false
			end
		end
	end
end)

hitbox.TouchEnded:Connect(function(hit)
	local humanoid = hit.Parent:FindFirstChild("Humanoid")
	if humanoid then
		local player = Players:GetPlayerFromCharacter(hit.Parent)
		if player then
			local index = table.find(hillPlayers, player)
			if index then
				table.remove(hillPlayers, index)
				updateHillStatus()
			end
		end
	end
end)

while task.wait(1) do
	updateHillStatus()
end
