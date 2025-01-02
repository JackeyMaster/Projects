local Popup = script.Parent.ScreenGui
local playersOnPart = {}

function onTouch(hit)
	local h = hit.Parent:FindFirstChild("Humanoid")
	if h then
		local plyr = game.Players:FindFirstChild(h.Parent.Name) 
		if plyr and not playersOnPart[plyr] then
			playersOnPart[plyr] = true
			local c = plyr.PlayerGui:FindFirstChild(Popup.Name)
			if not c then
				c = Popup:Clone()
				c.Parent = plyr.PlayerGui
			end
		end
	end
end

function onTouchEnded(hit)
	local h = hit.Parent:FindFirstChild("Humanoid")
	if h then
		local plyr = game.Players:FindFirstChild(h.Parent.Name)
		if plyr then
			wait(0.1)  
			local character = plyr.Character
			local rootPart = character and character:FindFirstChild("HumanoidRootPart")
			if rootPart then
				local touching = false
				for _, part in pairs(character:GetChildren()) do
					if part:IsA("BasePart") then
						local touchingParts = part:GetTouchingParts()
						for _, touchingPart in pairs(touchingParts) do
							if touchingPart == script.Parent then
								touching = true
								break
							end
						end
					end
					if touching then
						break
					end
				end

				if not touching and playersOnPart[plyr] then
					playersOnPart[plyr] = nil
					local c = plyr.PlayerGui:FindFirstChild(Popup.Name)
					if c then
						c:Destroy()  
					end
				end
			end
		end
	end
end

script.Parent.Touched:Connect(onTouch)
script.Parent.TouchEnded:Connect(onTouchEnded)
