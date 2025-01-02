game.Players.PlayerAdded:Connect(function(player)
	player.CharacterAdded:Connect(function(character)
		local humanoid = character:WaitForChild("Humanoid")

		humanoid.Died:Connect(function()
			local leaderstats = player:FindFirstChild("leaderstats")
			if leaderstats then
				local timeStat = leaderstats:FindFirstChild("Time")
				local streakStat = leaderstats:FindFirstChild("Streak")

				if timeStat then
					timeStat.Value = 0
				end

				if streakStat then
					streakStat.Value = 0
				end
			end
		end)
	end)
end)
