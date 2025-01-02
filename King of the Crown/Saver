-- Game settings and configurations
local gameStats = { 
	["DoMessages?"] = true, 
	["IsAnObby?"] = false,  
	saveType = {
		["Normal?"] = true,
		["SavingList?"] = { 
			["DoIt?"] = false,
			theList = { "Name1", "Name2", "Name3" }
		},
		["BestFriends?"] = false,  
		["Friends?"] = false, 
		["OwnerOnly?"] = false, 
		["Gamepass?"] = {  
			["DoIt?"] = false,
			["GamepassId"] = 000000
		},
		["Asset/Item?"] = {  
			["DoIt?"] = false,
			["AssetId"] = 000000
		}
	}
}

-- Services initialization
local debrisS = game:GetService("Debris")
local playerS = game:GetService("Players")
local datastoreS = game:GetService("DataStoreService")
local marketS = game:GetService("MarketplaceService")

-- Function to handle player joining/leaving
local function passedPlayer(p, isLeaving)
	print(p.Name .. " has passed")

	local function sendMessage(txt)
		if gameStats["DoMessages?"] then
			local playerGui = p:WaitForChild("PlayerGui")
			local message = Instance.new("Message", playerGui)
			message.Text = txt
			debrisS:AddItem(message, 2)  
		end
	end

	-- Function to save the player's stats
	local function save()
		local cDatastore = datastoreS:GetDataStore(p.Name .. "Stats")
		local statStorage = p:WaitForChild("leaderstats"):GetChildren()
		for _, stat in pairs(statStorage) do
			local success, errorMsg = pcall(function()
				cDatastore:SetAsync(stat.Name, stat.Value)
			end)
			if not success then
				warn("Failed to save " .. stat.Name .. ": " .. errorMsg)
			end
		end
		sendMessage("Your stats have been saved.")
	end

	-- Function to load the player's stats
	local function load()
		local cDatastore = datastoreS:GetDataStore(p.Name .. "Stats")
		local stats = p:FindFirstChild("leaderstats"):GetChildren()
		for _, stat in pairs(stats) do
			local success, result = pcall(function()
				return cDatastore:GetAsync(stat.Name)
			end)
			if success and result then
				stat.Value = result
			else
				warn("Failed to load " .. stat.Name .. ": " .. tostring(result))
			end
		end
	end

	if isLeaving then
		save()
	else
		load()
	end
end

local function passTest(p, isLeaving)
	print("Test starting")

	if gameStats["IsAnObby?"] then
		local function cAdded(c)
			p:LoadCharacter(true)
		end
		p.CharacterAdded:Connect(cAdded)
	end

	if gameStats.saveType["Normal?"] then
		passedPlayer(p, isLeaving)
	else
		if gameStats.saveType["SavingList?"]["DoIt?"] then
			for _, v in pairs(gameStats.saveType["SavingList?"].theList) do
				if p.Name == v then
					passedPlayer(p, isLeaving)
				end
			end
		elseif gameStats.saveType["BestFriends?"] then
			if p:IsBestFriendsWith(game.CreatorId) then
				passedPlayer(p, isLeaving)
			end
		elseif gameStats.saveType["Friends?"] then
			if p:IsFriendsWith(game.CreatorId) then
				passedPlayer(p, isLeaving)
			end
		elseif gameStats.saveType["OwnerOnly?"] then
			if p.UserId == game.CreatorId then
				passedPlayer(p, isLeaving)
			end
		elseif gameStats.saveType["Gamepass?"]["DoIt?"] then
			local hasGamepass = p:HasGamePass(gameStats.saveType["Gamepass?"]["GamepassId"])
			if hasGamepass then
				passedPlayer(p, isLeaving)
			end
		elseif gameStats.saveType["Asset/Item?"]["DoIt?"] then
			local ownsAsset = marketS:PlayerOwnsAsset(p, gameStats.saveType["Asset/Item?"]["AssetId"])
			if ownsAsset then
				passedPlayer(p, isLeaving)
			end
		end
	end
end

local function pAdded(p)
	while true do
		if p:FindFirstChild("leaderstats") then
			passTest(p, false)
			break
		end
		wait()
	end
end

local function pLeaving(p)
	passTest(p, true)
end

playerS.PlayerAdded:Connect(pAdded)
playerS.PlayerRemoving:Connect(pLeaving)
