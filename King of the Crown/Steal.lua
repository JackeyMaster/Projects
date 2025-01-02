local r = 0

game.ServerStorage.ServerEvents.GuyKilled.Event:Connect(function(target, player)
	if r == 0 then
		r = 1 

		-- Makes sure both player and target have leaderstats
		if player:FindFirstChild("leaderstats") and target:FindFirstChild("leaderstats") then
			local playerTime = player.leaderstats:FindFirstChild("Time")
			local playerKills = player.leaderstats:FindFirstChild("Kills")
			local playerStreak = player.leaderstats:FindFirstChild("Streak")

			local targetTime = target.leaderstats:FindFirstChild("Time")

			if playerTime and targetTime and playerKills and playerStreak then
				playerTime.Value = playerTime.Value + targetTime.Value
				targetTime.Value = 0  

				-- Update stats when a player kills another player
				playerKills.Value = playerKills.Value + 1
				playerStreak.Value = playerStreak.Value + 1
				wait(1)
				targetTime.Value = 0  
				wait(0.01)
			else
				warn("Missing leaderstats or Time value for player or target")
			end
		else
			warn("Missing leaderstats for player or target")
		end

		r = 0  
	end
end)
