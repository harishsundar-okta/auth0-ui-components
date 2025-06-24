import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, CheckCircle, Info, Star, Heart, Trash2, Edit } from 'lucide-react';
import Header from '@/components/Header';

const Playground = () => {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [switchValue, setSwitchValue] = useState(false);
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('option1');
  const [selectValue, setSelectValue] = useState('');
  const [sliderValue, setSliderValue] = useState([50]);
  const [progressValue, setProgressValue] = useState(65);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">UI Components Playground</h1>
            <p className="text-lg text-gray-600">
              Explore and interact with our collection of UI components. Try different variants,
              sizes, and states.
            </p>
          </div>

          <Tabs defaultValue="forms" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="forms">Forms</TabsTrigger>
              <TabsTrigger value="buttons">Buttons</TabsTrigger>
              <TabsTrigger value="display">Display</TabsTrigger>
              <TabsTrigger value="feedback">Feedback</TabsTrigger>
              <TabsTrigger value="navigation">Navigation</TabsTrigger>
            </TabsList>

            {/* Forms Tab */}
            <TabsContent value="forms" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Form Components</CardTitle>
                  <CardDescription>
                    Interactive form elements with different states and variants
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input Components */}
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="input-default">Default Input</Label>
                        <Input
                          id="input-default"
                          placeholder="Enter some text..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="input-disabled">Disabled Input</Label>
                        <Input id="input-disabled" placeholder="Disabled input" disabled />
                      </div>
                      <div>
                        <Label htmlFor="textarea">Textarea</Label>
                        <Textarea
                          id="textarea"
                          placeholder="Enter your message..."
                          value={textareaValue}
                          onChange={(e) => setTextareaValue(e.target.value)}
                        />
                      </div>
                    </div>

                    {/* Selection Controls */}
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="switch"
                          checked={switchValue}
                          onCheckedChange={setSwitchValue}
                        />
                        <Label htmlFor="switch">Enable notifications</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="checkbox"
                          checked={checkboxValue}
                          onCheckedChange={(checked) => setCheckboxValue(checked === true)}
                        />
                        <Label htmlFor="checkbox">Accept terms and conditions</Label>
                      </div>

                      <div>
                        <Label>Select an option</Label>
                        <Select value={selectValue} onValueChange={setSelectValue}>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose an option" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Radio Group</Label>
                        <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option1" id="r1" />
                            <Label htmlFor="r1">Option 1</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option2" id="r2" />
                            <Label htmlFor="r2">Option 2</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option3" id="r3" />
                            <Label htmlFor="r3">Option 3</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                  </div>

                  {/* Slider */}
                  <div className="space-y-2">
                    <Label>Slider Value: {sliderValue[0]}</Label>
                    <Slider
                      value={sliderValue}
                      onValueChange={setSliderValue}
                      max={100}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Buttons Tab */}
            <TabsContent value="buttons" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>Different button styles and states</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold">Primary Buttons</h4>
                      <div className="space-y-2">
                        <Button className="w-full">Default</Button>
                        <Button className="w-full" disabled>
                          Disabled
                        </Button>
                        <Button className="w-full" size="sm">
                          Small
                        </Button>
                        <Button className="w-full" size="lg">
                          Large
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Secondary Buttons</h4>
                      <div className="space-y-2">
                        <Button variant="secondary" className="w-full">
                          Secondary
                        </Button>
                        <Button variant="outline" className="w-full">
                          Outline
                        </Button>
                        <Button variant="ghost" className="w-full">
                          Ghost
                        </Button>
                        <Button variant="link" className="w-full">
                          Link
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Icon Buttons</h4>
                      <div className="space-y-2">
                        <Button className="w-full">
                          <Star className="w-4 h-4 mr-2" />
                          Favorite
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Heart className="w-4 h-4 mr-2" />
                          Like
                        </Button>
                        <Button variant="destructive" className="w-full">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                        <Button variant="ghost" className="w-full">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Display Tab */}
            <TabsContent value="display" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Badges & Avatars</CardTitle>
                    <CardDescription>Visual elements for displaying information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-semibold mb-2">Badges</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Default</Badge>
                        <Badge variant="secondary">Secondary</Badge>
                        <Badge variant="destructive">Destructive</Badge>
                        <Badge variant="outline">Outline</Badge>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Avatars</h4>
                      <div className="flex gap-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>LG</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Separator</h4>
                      <div className="space-y-2">
                        <div>Section 1</div>
                        <Separator />
                        <div>Section 2</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Progress & Data</CardTitle>
                    <CardDescription>Components for showing progress and data</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Progress</Label>
                        <span className="text-sm text-gray-600">{progressValue}%</span>
                      </div>
                      <Progress value={progressValue} className="mb-2" />
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setProgressValue(Math.max(0, progressValue - 10))}
                        >
                          -10
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
                        >
                          +10
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Sample Card</h4>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Card Title</CardTitle>
                          <CardDescription>Card description text</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-gray-600">
                            This is a sample card content area.
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Feedback Tab */}
            <TabsContent value="feedback" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Alerts & Notifications</CardTitle>
                  <CardDescription>Different types of feedback components</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Info</AlertTitle>
                    <AlertDescription>
                      This is an informational alert with some additional details.
                    </AlertDescription>
                  </Alert>

                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertTitle className="text-green-800">Success</AlertTitle>
                    <AlertDescription className="text-green-700">
                      Your action was completed successfully!
                    </AlertDescription>
                  </Alert>

                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>
                      Something went wrong. Please try again later.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Navigation Tab */}
            <TabsContent value="navigation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Navigation Components</CardTitle>
                  <CardDescription>Tabs and other navigation elements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Sample Tabs</h4>
                      <Tabs defaultValue="tab1" className="w-full">
                        <TabsList>
                          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
                          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
                          <TabsTrigger value="tab3">Tab 3</TabsTrigger>
                        </TabsList>
                        <TabsContent value="tab1" className="mt-4">
                          <p className="text-sm text-gray-600">Content for Tab 1</p>
                        </TabsContent>
                        <TabsContent value="tab2" className="mt-4">
                          <p className="text-sm text-gray-600">Content for Tab 2</p>
                        </TabsContent>
                        <TabsContent value="tab3" className="mt-4">
                          <p className="text-sm text-gray-600">Content for Tab 3</p>
                        </TabsContent>
                      </Tabs>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Playground;
