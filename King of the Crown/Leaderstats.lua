local DSS = require(game.ServerStorage.Modules.Datastores)

local function onPlayerEntered(newPlayer)
	local PlrStore = DSS:GetStore(newPlayer, "StatsStore", {})
	if not PlrStore then
		repeat
			PlrStore = DSS:GetStore(newPlayer, "StatsStore", {})
			wait(0.25)
		until PlrStore
	end

	local stats = Instance.new("IntValue")
	stats.Name = "leaderstats"

	local timeStat = Instance.new("IntValue")
	timeStat.Name = "Time"
	timeStat.Value = PlrStore.Time or 0
	timeStat.Parent = stats

	local killsStat = Instance.new("IntValue")
	killsStat.Name = "Kills"
	killsStat.Value = PlrStore.Kills or 0
	killsStat.Parent = stats

	local streakStat = Instance.new("IntValue")
	streakStat.Name = "Streak"
	streakStat.Value = PlrStore.Streak or 0
	streakStat.Parent = stats

	stats.Parent = newPlayer

	local function createOrUpdateBillboardGui()
		local head = newPlayer.Character and newPlayer.Character:FindFirstChild("Head")
		if head then
			local billboardGui = head:FindFirstChild("Time")
			if not billboardGui then
				billboardGui = game.ServerStorage.ClonedObjects.Example:Clone()
				billboardGui.Parent = head
				billboardGui.Name = "Time"
			end
			billboardGui.Time.Text = tostring(timeStat.Value)
		end
	end

	newPlayer.CharacterAdded:Connect(function()
		wait(1)  
		createOrUpdateBillboardGui()
	end)

	local function onValChanged(value)
		DSS:ChangeStore(newPlayer, "StatsStore", {value.Name}, value.Value)
	end

	timeStat:GetPropertyChangedSignal("Value"):Connect(function()
		onValChanged(timeStat)
		createOrUpdateBillboardGui()  
	end)

	killsStat:GetPropertyChangedSignal("Value"):Connect(function()
		onValChanged(killsStat)
	end)

	streakStat:GetPropertyChangedSignal("Value"):Connect(function()
		onValChanged(streakStat)
	end)

	createOrUpdateBillboardGui()

	local function updateTime()
		while true do
			wait(0.85)
			local character = newPlayer.Character
			if character and character:FindFirstChild("Humanoid") then
				local humanoid = character.Humanoid
				if humanoid.Health > 0 then
					local inSafeZone = false
					local safeZoneParts = _G.SafeZone
					for _, part in ipairs(workspace:FindPartsInRegion3WithWhiteList(safeZoneParts, {character})) do
						if part == character.HumanoidRootPart then
							inSafeZone = true
							break
						end
					end
					if not inSafeZone then
						timeStat.Value = timeStat.Value + 10
					end
				end
			end
		end
	end

	spawn(updateTime)
end

game.Players.PlayerAdded:Connect(onPlayerEntered)
